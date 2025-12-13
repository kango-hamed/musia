import { PositionalAudio } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CylinderCollider, RigidBody } from '@react-three/rapier';
import { forwardRef, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useMuseumStore } from '../../store/museumStore';

const Robot = forwardRef(({ waypoints = [], speed = 2, playerRef, onWaypointReached }, ref) => {
  const robotRef = ref || useRef();
  const audioRef = useRef();
  const { currentAudioUrl, isPlayingAudio, setIsPlayingAudio } = useMuseumStore();
  
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(0);
  const [isWaitingForVisitor, setIsWaitingForVisitor] = useState(false);
  
  const currentPos = useRef(new THREE.Vector3(0, 0.5, 0));
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentRotation = useRef(0);
  const pauseTimer = useRef(0);
  const isPaused = useRef(false);

  // Gestion de l'audio spatial
  useEffect(() => {
    if (currentAudioUrl && audioRef.current) {
      if (audioRef.current.isPlaying) {
        audioRef.current.stop();
      }
      
      const sound = audioRef.current;
      
      // Petit délai pour s'assurer que l'audio est chargé
      // Note: PositionalAudio gère le chargement, mais on force le play quand l'URL change
      // autoplay est true, mais on veut être sûr
      
      return () => {
        if (sound.isPlaying) sound.stop();
      };
    }
  }, [currentAudioUrl]);

  // Si on doit jouer l'audio mais qu'il ne joue pas (reprise)
  useEffect(() => {
    if (isPlayingAudio && audioRef.current && !audioRef.current.isPlaying && currentAudioUrl) {
      audioRef.current.play();
    }
  }, [isPlayingAudio, currentAudioUrl]);

  useEffect(() => {
    if (waypoints.length > 0) {
      const wp = waypoints[currentWaypointIndex];
      targetPos.current.set(wp.position[0], wp.position[1], wp.position[2]);
    }
  }, [currentWaypointIndex, waypoints]);

  useFrame((state, delta) => {
    if (!robotRef.current || waypoints.length === 0) return;

    const position = robotRef.current.translation();
    currentPos.current.set(position.x, position.y, position.z);

    const currentWaypoint = waypoints[currentWaypointIndex];
    
    // Vérifier la distance avec le visiteur
    let distanceToPlayer = Infinity;
    if (playerRef?.current) {
      const playerPos = playerRef.current.translation();
      distanceToPlayer = new THREE.Vector2(
        currentPos.current.x - playerPos.x,
        currentPos.current.z - playerPos.z
      ).length();
    }

    // Si en attente du visiteur
    if (isWaitingForVisitor) {
      // Arrêter le mouvement
      robotRef.current.setLinvel({ x: 0, y: robotRef.current.linvel().y, z: 0 }, true);
      
      // Regarder vers le visiteur
      if (playerRef?.current) {
        const playerPos = playerRef.current.translation();
        const directionToPlayer = new THREE.Vector3(
          playerPos.x - currentPos.current.x,
          0,
          playerPos.z - currentPos.current.z
        ).normalize();
        
        const targetAngle = Math.atan2(directionToPlayer.x, directionToPlayer.z);
        const currentAngle = currentRotation.current;
        
        let angleDiff = targetAngle - currentAngle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        
        currentRotation.current += angleDiff * 0.1;
        
        robotRef.current.setRotation({ 
          x: 0, 
          y: currentRotation.current, 
          z: 0, 
          w: 1 
        }, true);
      }
      
      // Le visiteur est proche, continuer
      // On attend AUSSI la fin de l'audio si le robot parle
      if (distanceToPlayer < 2.5 && !isPlayingAudio) {
        setIsWaitingForVisitor(false);
        
        // Passer au waypoint suivant
        if (currentWaypointIndex < waypoints.length - 1) {
          setCurrentWaypointIndex(currentWaypointIndex + 1);
        }
      }
      
      return;
    }
    
    // Si en pause (devant une œuvre)
    if (isPaused.current) {
      pauseTimer.current += delta;
      
      // Arrêter le mouvement
      robotRef.current.setLinvel({ x: 0, y: robotRef.current.linvel().y, z: 0 }, true);
      
      // Rotation vers l'œuvre
      if (currentWaypoint.lookAt) {
        const lookAtPos = new THREE.Vector3(...currentWaypoint.lookAt);
        const direction = new THREE.Vector3()
          .subVectors(lookAtPos, currentPos.current)
          .setY(0)
          .normalize();
        
        const targetAngle = Math.atan2(direction.x, direction.z);
        const currentAngle = currentRotation.current;
        
        let angleDiff = targetAngle - currentAngle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        
        currentRotation.current += angleDiff * 0.1;
        
        robotRef.current.setRotation({ 
          x: 0, 
          y: currentRotation.current, 
          z: 0, 
          w: 1 
        }, true);
      }
      
      // Fin de la pause - Seulement si l'audio est fini (si audio en cours) ou timer écoulé
      const minDuration = (currentWaypoint.duration || 3000) / 1000;
      if (pauseTimer.current >= minDuration) {
        // On n'attend pas forcément la fin de l'audio ici pour passer à l'attente du visiteur
        // Le robot se tourne vers le visiteur ensuite
        
        isPaused.current = false;
        pauseTimer.current = 0;
        setIsWaitingForVisitor(true);
      }
      
      return;
    }

    // Direction vers le waypoint
    const direction = new THREE.Vector3()
      .subVectors(targetPos.current, currentPos.current)
      .setY(0)
      .normalize();

    const distanceToTarget = new THREE.Vector2(
      currentPos.current.x - targetPos.current.x,
      currentPos.current.z - targetPos.current.z
    ).length();

    // Arrivé au waypoint
    if (distanceToTarget < 0.5) {
      isPaused.current = true;
      
      if (onWaypointReached) {
        onWaypointReached(currentWaypointIndex);
      }
    } else {
      // Rotation progressive
      const targetAngle = Math.atan2(direction.x, direction.z);
      const currentAngle = currentRotation.current;
      
      let angleDiff = targetAngle - currentAngle;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      
      currentRotation.current += angleDiff * 0.15;
      
      // Mouvement
      const moveDirection = new THREE.Vector3(
        Math.sin(currentRotation.current),
        0,
        Math.cos(currentRotation.current)
      ).normalize();
      
      const velocity = moveDirection.multiplyScalar(speed);
      
      robotRef.current.setLinvel({
        x: velocity.x,
        y: robotRef.current.linvel().y,
        z: velocity.z
      }, true);

      robotRef.current.setRotation({ 
        x: 0, 
        y: currentRotation.current, 
        z: 0, 
        w: 1 
      }, true);
    }
  });

  return (
    <RigidBody
      ref={robotRef}
      type="dynamic"
      position={[0, 0.5, 0]}
      mass={10}
      linearDamping={5}
      angularDamping={5}
      enabledRotations={[false, true, false]}
    >
      <group>
        {/* Corps du robot */}
        <mesh castShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.8, 16]} />
          <meshStandardMaterial color="#4a90e2" metalness={0.5} roughness={0.5} />
        </mesh>

        {/* Tête */}
        <mesh castShadow position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#357abd" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Indicateur de direction */}
        <mesh castShadow position={[0, 0, 0.35]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial 
            color={isWaitingForVisitor ? "#ff0000" : "#00ff00"} 
            emissive={isWaitingForVisitor ? "#ff0000" : "#00ff00"} 
            emissiveIntensity={0.5} 
          />
        </mesh>
        
        {/* Audio Spatial */}
        {currentAudioUrl && (
          <PositionalAudio
            ref={audioRef}
            url={currentAudioUrl}
            distance={5} // Distance de référence (son normal)
            loop={false}
            autoplay={true}
            onEnded={() => setIsPlayingAudio(false)}
          />
        )}
      </group>

      <CylinderCollider args={[0.4, 0.35]} />
    </RigidBody>
  );
});

Robot.displayName = 'Robot';

export default Robot;
