import { RigidBody } from '@react-three/rapier';

function Obstacles() {
  // Générer des obstacles aléatoires
  const obstacles = [
    // Cubes
    { type: 'box', position: [3, 0.5, 2], size: [1, 1, 1], color: '#e74c3c' },
    { type: 'box', position: [-4, 0.5, -3], size: [1.5, 1, 1.5], color: '#e67e22' },
    { type: 'box', position: [2, 0.4, -4], size: [0.8, 0.8, 0.8], color: '#f39c12' },
    
    // Cylindres
    { type: 'cylinder', position: [-3, 0.6, 3], radius: 0.4, height: 1.2, color: '#9b59b6' },
    { type: 'cylinder', position: [5, 0.5, -2], radius: 0.3, height: 1, color: '#8e44ad' },
    
    // Sphères
    { type: 'sphere', position: [0, 0.5, 0], radius: 0.5, color: '#3498db' },
    { type: 'sphere', position: [-5, 0.4, 5], radius: 0.4, color: '#2980b9' },
    
    // Obstacles longs (barrières)
    { type: 'box', position: [1, 0.3, 4], size: [3, 0.6, 0.3], color: '#16a085' },
    { type: 'box', position: [-2, 0.3, -5], size: [0.3, 0.6, 2], color: '#27ae60' },
  ];

  return (
    <group>
      {obstacles.map((obstacle, index) => (
        <RigidBody
          key={index}
          type="fixed"
          position={obstacle.position}
          colliders="hull"
        >
          {obstacle.type === 'box' && (
            <mesh castShadow receiveShadow>
              <boxGeometry args={obstacle.size} />
              <meshStandardMaterial 
                color={obstacle.color} 
                roughness={0.7}
                metalness={0.2}
              />
            </mesh>
          )}
          
          {obstacle.type === 'cylinder' && (
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[obstacle.radius, obstacle.radius, obstacle.height, 16]} />
              <meshStandardMaterial 
                color={obstacle.color} 
                roughness={0.7}
                metalness={0.2}
              />
            </mesh>
          )}
          
          {obstacle.type === 'sphere' && (
            <mesh castShadow receiveShadow>
              <sphereGeometry args={[obstacle.radius, 16, 16]} />
              <meshStandardMaterial 
                color={obstacle.color} 
                roughness={0.7}
                metalness={0.2}
              />
            </mesh>
          )}
        </RigidBody>
      ))}
    </group>
  );
}

export default Obstacles;
