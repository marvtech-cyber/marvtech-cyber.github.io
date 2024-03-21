import {loadGLTF} from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/animals.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const antelope = await loadGLTF("./assets/models/antelope/scene.glb");
    antelope.scene.scale.set(0.5, 0.5, 0.5);
    antelope.scene.position.set(0, -0.4, 0);

    

    const gorilla = await loadGLTF("./assets/models/gorilla/scene.glb");
    gorilla .scene.scale.set(0.7, 0.7, 0.7);
    gorilla .scene.position.set(0, -0.4, 0);


    const antelopeAnchor = mindarThree.addAnchor(0);
    antelopeAnchor.group.add(antelope.scene);

    

    const gorillaAnchor = mindarThree.addAnchor(6);
    gorillaAnchor.group.add(gorilla.scene);

    


    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});