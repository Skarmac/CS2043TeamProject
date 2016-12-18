function init(){camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1e6),scene=new THREE.Scene,controls=new THREE.FirstPersonControls(camera),controls.movementSpeed=100,controls.lookSpeed=.1;var e=(new THREE.TextureLoader,[(new THREE.MeshBasicMaterial).color="#000000",(new THREE.MeshBasicMaterial).color="#000000",(new THREE.MeshBasicMaterial).color="#000000",(new THREE.MeshBasicMaterial).color="#000000",(new THREE.MeshBasicMaterial).color="#000000",(new THREE.MeshBasicMaterial).color="#000000"]);mesh=new THREE.Mesh(new THREE.BoxGeometry(1e4,1e4,1e4,7,7,7),new THREE.MultiMaterial(e)),mesh.scale.x=-1,scene.add(mesh),renderer=new THREE.WebGLRenderer,renderer.setPixelRatio(window.devicePixelRatio),renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(renderer.domElement);var t=function(e,t){return Math.pow(e[0]-t[0],2)+Math.pow(e[1]-t[1],2)+Math.pow(e[2]-t[2],2)};positions=new Float32Array(3*amountOfParticles),alphas=new Float32Array(amountOfParticles),_particleGeom=new THREE.BufferGeometry,_particleGeom.addAttribute("position",new THREE.BufferAttribute(positions,3)),_particleGeom.addAttribute("alpha",new THREE.BufferAttribute(alphas,1)),particles=new THREE.Points(_particleGeom);for(var i=0;i<file.length-1;i++)positions[3*i+0]=250*file[i][0],positions[3*i+1]=250*file[i][1],positions[3*i+2]=250*file[i][2],alphas[i]=1;var r=(new Date).getTime();kdtree=new THREE.TypedArrayUtils.Kdtree(positions,t,3),console.log("TIME building kdtree",(new Date).getTime()-r),scene.add(particles),window.addEventListener("resize",onWindowResize,!1)}function onWindowResize(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight),controls.handleResize()}function animate(){requestAnimationFrame(animate),displayNearest(camera.position),controls.update(clock.getDelta()),renderer.render(scene,camera)}function displayNearest(e){var t=kdtree.nearest([e.x,e.y,e.z],100,maxDistance),r=new THREE.Frustum,n=new THREE.Matrix4;for(camera.matrixWorldInverse.getInverse(camera.matrixWorld),n.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse),r.setFromMatrix(n),i=0,il=t.length;i<il;i++){var a=t[i],o=(new THREE.Vector3).fromArray(a[0].obj);if(r.containsPoint(o)){var s=a[0].pos;alphas[s]=1/maxDistance*a[1],_particleGeom.attributes.alpha.needsUpdate=!0}}}var camera,scene,renderer,geometry,mesh,controls,objects=[],amountOfParticles=5e5,maxDistance=Math.pow(120,2),positions,alphas,particles,_particleGeom,clock=new THREE.Clock,blocker=document.getElementById("blocker"),instructions=document.getElementById("instructions"),url=document.getElementById("url").textContent;alert(window.location.origin),jQuery.get(window.location.origin+url,function(e){alert(e),file=e.split("/");for(var t=0;t<file.length;)file[t]=file[t].split(" "),t++,t==file.length-1&&(init(file),animate())});