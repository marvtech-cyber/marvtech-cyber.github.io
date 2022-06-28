import {loadGLTF , loadVideo} from "../libs/loader.js";

const THREE = window.MINDAR.IMAGE.THREE;


document.addEventListener('DOMContentLoaded', () => {
	const start = async () => {
		//mockWithVideo("../../assets/mock-videos/musicband1.mp4");
		 //mockWithImage("../assets/mock-videos/musicband-bear.png");

		const mindarThree = new window.MINDAR.IMAGE.MindARThree({
			container:  document.body,
			imageTargetSrc:'../assets/targets/chamo.mind',
			uiLoading: "no",
		});
		const {renderer, scene, camera} = mindarThree;

		const video = await loadVideo("../../assets/videos/sintel/chamotea.mp4");
		const texture = new THREE.VideoTexture(video);

		const geometry = new THREE.PlaneGeometry(1, 204/480); // video aspect ratio 1 = width of video ,204/480 is the  height 
		const material = new THREE.MeshBasicMaterial({map: texture});
		const plane = new THREE.Mesh(geometry, material); //overlays the target image
		

		const anchor = mindarThree.addAnchor(0);
		anchor.group.add(plane);

		anchor.onTargetFound = () => {
			video.play();
		} 
		anchor.onTargetLost = () => {
			video.pause();
		}
		video.addEventListener("play",() => {
			video.currentTime = 6; //event listener plays video from 6 seconds because the image target was captured on 6th frame,allows seamless integration when starting to play
		});
		

		await mindarThree.start();

		renderer.setAnimationLoop(() =>{ 
			renderer.render(scene, camera);
		});
	};
	start();
});