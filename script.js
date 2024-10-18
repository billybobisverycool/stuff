// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas'), alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a basic ground
const planeGeometry = new THREE.PlaneGeometry(500, 500);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Create blocks
const blockSize = 1;
const blocks = [];
function createBlock(x, z) {
    const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
    const material = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Brown color
    const block = new THREE.Mesh(geometry, material);
    block.position.set(x * blockSize, blockSize / 2, z * blockSize);
    blocks.push(block);
    scene.add(block);
}

// Create a grid of blocks
for (let i = -5; i < 5; i++) {
    for (let j = -5; j < 5; j++) {
        createBlock(i, j);
    }
}

// Set up player
const controls = new THREE.PointerLockControls(camera, document.body);
scene.add(controls.getObject());
document.body.addEventListener('click', () => {
    controls.lock();
});

// Movement variables
const movementSpeed = 0.1;
let velocity = new THREE.Vector3();
let canJump = false;

// Event listeners for movement
const keyState = {};
window.addEventListener('keydown', (event) => {
    keyState[event.code] = true;
});
window.addEventListener('keyup', (event) => {
    keyState[event.code] = false;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (keyState['KeyW']) {
        velocity.z = -movementSpeed;
    } else if (keyState['KeyS']) {
        velocity.z = movementSpeed;
    } else {
        velocity.z = 0;
    }

    if (keyState['KeyA']) {
        velocity.x = -movementSpeed;
    } else if (keyState['KeyD']) {
        velocity.x = movementSpeed;
    } else {
        velocity.x = 0;
    }

    if (canJump && keyState['Space']) {
        velocity.y = 0.5; // Jump
        canJump = false;
    }

    velocity.y -= 0.01; // Gravity

    controls.getObject().position.add(velocity);

    // Ground collision check
    if (controls.getObject().position.y < blockSize / 2) {
        controls.getObject().position.y = blockSize / 2;
        canJump = true;
    }

    renderer.render(scene, camera);
}

// Resize the renderer on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the animation loop
animate();
