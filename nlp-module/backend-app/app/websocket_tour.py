# Ajouter après la ligne 106 dans main.py

@sio.event
async def waypoint_reached(sid, data):
    """
    Événement déclenché quand le robot atteint un waypoint
    
    Data attendu:
    {
        "waypoint_index": 0,
        "artwork_name": "La Joconde",
        "artist": "Léonard de Vinci"
    }
    """
    logger.info(f"Waypoint reached from {sid}: {data}")
    
    try:
        waypoint_index = data.get('waypoint_index', 0)
        artwork_name = data.get('artwork_name', '')
        artist = data.get('artist', '')
        
        # Générer le texte selon le waypoint
        if waypoint_index == 0:
            # Message d'accueil
            text = "Bonjour et bienvenue au musée virtuel. Je suis votre guide robot. Suivez-moi pour découvrir nos œuvres."
        else:
            # Description de l'œuvre
            if artist:
                text = f"Nous voici devant {artwork_name}, une œuvre magnifique de {artist}. Prenez le temps de l'admirer."
            else:
                text = f"Voici {artwork_name}. Une œuvre remarquable qui mérite votre attention."
        
        # Générer l'audio avec TTS
        audio_path = await tts_service.synthesize(text)
        
        # Lire le fichier audio et encoder en base64
        with open(audio_path, 'rb') as audio_file:
            import base64
            audio_data = audio_file.read()
            audio_base64 = base64.b64encode(audio_data).decode('utf-8')
        
        # Envoyer la réponse au frontend
        await sio.emit('robot_speech', {
            'type': 'robot_speech',
            'text': text,
            'audio_base64': audio_base64,
            'waypoint_index': waypoint_index
        }, room=sid)
        
        logger.info(f"Audio sent for waypoint {waypoint_index}")
        
    except Exception as e:
        logger.error(f"Error in waypoint_reached: {e}")
        await sio.emit('error', {'detail': str(e)}, room=sid)
