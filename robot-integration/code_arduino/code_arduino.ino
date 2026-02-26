// ============================================================
// KEYESTUDIO 4WD BLUETOOTH ROBOT CAR V2.0
// Modes personnalisés pour démonstration
// ============================================================

#include <Arduino.h>
#include <Servo.h>
#include <Ultrasonic.h>

// ============================================================
// DÉFINITIONS ET CONSTANTES
// ============================================================

// Pins IIC pour matrice LED 8x8
#define IIC_SCL  A5
#define IIC_SDA  A4

// Pins capteurs de ligne
#define PIN_CAPTEUR_GAUCHE  11
#define PIN_CAPTEUR_CENTRE  7
#define PIN_CAPTEUR_DROIT   8

// Pins moteurs
#define PIN_MOTEUR_GAUCHE_DIR   2
#define PIN_MOTEUR_GAUCHE_PWM   5
#define PIN_MOTEUR_DROIT_DIR    4
#define PIN_MOTEUR_DROIT_PWM    6

// Pins ultrason
#define PIN_ULTRASONIC_TRIG  12
#define PIN_ULTRASONIC_ECHO  13

// Pin servo
#define PIN_SERVO  A3

// Commandes Bluetooth
#define CMD_AVANCER         'F'
#define CMD_RECULER         'B'
#define CMD_GAUCHE          'L'
#define CMD_DROITE          'R'
#define CMD_STOP            'S'
#define CMD_VITESSE_UP      'a'
#define CMD_VITESSE_DOWN    'd'
#define CMD_MODE_CONFINEMENT 'G'
#define CMD_MODE_SUIVI_LIGNE_AMELIORE 'X'  // Tracking amélioré avec évitement
#define CMD_MODE_TRAJET_PREDEFINI 'U'      // Remplace following
#define CMD_MODE_AVOIDING    'Y'

// Constantes pour la détection d'obstacles
#define DISTANCE_DETECTION_OBSTACLE 20  // en cm

// ============================================================
// VARIABLES GLOBALES
// ============================================================

char ble_val = 0;
int speeds = 150;
int L_val = 0;
int M_val = 0;
int R_val = 0;
int distance = 0;
int flag = 0;

// Variables pour le trajet prédéfini
int etapeTrajet = 0;
bool modeTrajetActif = false;

// ============================================================
// OBJETS
// ============================================================

Servo servo_A3;
Ultrasonic ultrasonic_12_13(PIN_ULTRASONIC_TRIG, PIN_ULTRASONIC_ECHO);

// ============================================================
// MATRICES LED 8x8 - PATTERNS D'AFFICHAGE
// ============================================================

unsigned char clear[] = {0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};
unsigned char start01[] = {0x80,0x01,0x40,0x02,0x20,0x04,0x10,0x08,0x08,0x10,0x04,0x20,0x02,0x40,0x01,0x80};
unsigned char matrix_smile[] = {0x00,0x00,0x1c,0x38,0x22,0x44,0x22,0x44,0x22,0x44,0x00,0x00,0x03,0xc0,0x00,0x00};
unsigned char matrix_speechless[] = {0x00,0x00,0x7c,0x3e,0x00,0x00,0x03,0xc0,0x02,0x40,0x02,0x40,0x03,0xc0,0x00,0x00};
unsigned char matrix_heart[] = {0x0e,0x70,0x1f,0xf8,0x1f,0xf8,0x1f,0xf8,0x0f,0xf0,0x07,0xe0,0x03,0xc0,0x01,0x80};
unsigned char matrix_front[] = {0x01,0x00,0x02,0x80,0x04,0x40,0x01,0x00,0x02,0x80,0x04,0x40,0x00,0x00,0x00,0x00};
unsigned char matrix_back[] = {0x00,0x00,0x00,0x00,0x04,0x40,0x02,0x80,0x01,0x00,0x04,0x40,0x02,0x80,0x01,0x00};
unsigned char matrix_right[] = {0x00,0x00,0x00,0x00,0x08,0x88,0x04,0x44,0x02,0x22,0x04,0x44,0x08,0x88,0x00,0x00};
unsigned char matrix_left[] = {0x00,0x00,0x00,0x00,0x11,0x10,0x22,0x20,0x44,0x40,0x22,0x20,0x11,0x10,0x00,0x00};
unsigned char matrix_stop[] = {0x00,0x00,0xee,0xee,0x84,0xaa,0xe4,0xae,0x24,0xa8,0x24,0xa8,0xe4,0xe8,0x00,0x00};
unsigned char matrix_tsundere[] = {0x00,0x00,0x3c,0x78,0x01,0x00,0x02,0x80,0x04,0x40,0x00,0x20,0x00,0x00,0x00,0x00};
unsigned char matrix_squinting[] = {0x10,0x08,0x08,0x10,0x04,0x20,0x02,0x40,0x04,0x20,0x08,0x10,0x13,0xc8,0x00,0x00};
unsigned char matrix_despise1[] = {0x00,0x00,0x20,0x40,0x3e,0x7c,0x00,0x00,0x00,0x00,0x03,0xc0,0x00,0x00,0x00,0x00};

// ============================================================
// FONCTIONS MATRICE LED 8x8
// ============================================================

void IIC_start() {
  digitalWrite(IIC_SCL, LOW);
  delayMicroseconds(3);
  digitalWrite(IIC_SDA, HIGH);
  delayMicroseconds(3);
  digitalWrite(IIC_SCL, HIGH);
  delayMicroseconds(3);
  digitalWrite(IIC_SDA, LOW);
  delayMicroseconds(3);
}

void IIC_send(unsigned char send_data) {
  for(char i = 0; i < 8; i++) {
    digitalWrite(IIC_SCL, LOW);
    delayMicroseconds(3);
    if(send_data & 0x01) {
      digitalWrite(IIC_SDA, HIGH);
    }
    else {
      digitalWrite(IIC_SDA, LOW);
    }
    delayMicroseconds(3);
    digitalWrite(IIC_SCL, HIGH);
    delayMicroseconds(3);
    send_data = send_data >> 1;
  }
}

void IIC_end() {
  digitalWrite(IIC_SCL, LOW);
  delayMicroseconds(3);
  digitalWrite(IIC_SDA, LOW);
  delayMicroseconds(3);
  digitalWrite(IIC_SCL, HIGH);
  delayMicroseconds(3);
  digitalWrite(IIC_SDA, HIGH);
  delayMicroseconds(3);
}

void matrix_display(unsigned char matrix_value[]) {
  unsigned char dat[16] = {0}, dat_d[16] = {0}, temp;
  
  for(char i = 0; i < 16; i++) {
    temp = matrix_value[i];
    for(char b = 0; b < 8; b++) {
      if(temp & 0x01) {
        dat[i] |= (1 << (7 - b));
      }
      temp = temp >> 1;
    }
  }
  
  unsigned char index = 0, bit = 0, index_rc = 0, bit_rc = 0;
  for(index = 0; index < 16; index++) {
    for(bit = 0; bit < 8; bit++) {
      if(dat[index] & (1 << bit)) {
        dat_d[index_rc] |= (1 << (bit_rc / 16));
      }
      bit_rc++;
      index_rc++;
      if(index_rc == 16)
        index_rc = 0;
    }
  }
  
  IIC_start();
  IIC_send(0xc0);
  for(int i = 0; i < 16; i++) {
    IIC_send(dat_d[i]);
  }
  IIC_end();
  IIC_start();
  IIC_send(0x8A);
  IIC_end();
}

// ============================================================
// FONCTIONS DE CONTRÔLE MOTEUR
// ============================================================

void moteur_arreter() {
  digitalWrite(PIN_MOTEUR_GAUCHE_DIR, LOW);
  analogWrite(PIN_MOTEUR_GAUCHE_PWM, 0);
  digitalWrite(PIN_MOTEUR_DROIT_DIR, LOW);
  analogWrite(PIN_MOTEUR_DROIT_PWM, 0);
}

void moteur_avancer(int vitesse) {
  digitalWrite(PIN_MOTEUR_GAUCHE_DIR, HIGH);
  analogWrite(PIN_MOTEUR_GAUCHE_PWM, 255 - vitesse);
  digitalWrite(PIN_MOTEUR_DROIT_DIR, HIGH);
  analogWrite(PIN_MOTEUR_DROIT_PWM, 255 - vitesse);
}

void moteur_reculer(int vitesse) {
  digitalWrite(PIN_MOTEUR_GAUCHE_DIR, LOW);
  analogWrite(PIN_MOTEUR_GAUCHE_PWM, vitesse);
  digitalWrite(PIN_MOTEUR_DROIT_DIR, LOW);
  analogWrite(PIN_MOTEUR_DROIT_PWM, vitesse);
}

void moteur_tourner_gauche(int vitesse) {
  digitalWrite(PIN_MOTEUR_GAUCHE_DIR, LOW);
  analogWrite(PIN_MOTEUR_GAUCHE_PWM, vitesse);
  digitalWrite(PIN_MOTEUR_DROIT_DIR, HIGH);
  analogWrite(PIN_MOTEUR_DROIT_PWM, 255 - vitesse);
}

void moteur_tourner_droite(int vitesse) {
  digitalWrite(PIN_MOTEUR_GAUCHE_DIR, HIGH);
  analogWrite(PIN_MOTEUR_GAUCHE_PWM, 255 - vitesse);
  digitalWrite(PIN_MOTEUR_DROIT_DIR, LOW);
  analogWrite(PIN_MOTEUR_DROIT_PWM, vitesse);
}

// ============================================================
// FONCTIONS CAPTEURS
// ============================================================

void lire_capteurs_ligne() {
  L_val = digitalRead(PIN_CAPTEUR_GAUCHE);
  M_val = digitalRead(PIN_CAPTEUR_CENTRE);
  R_val = digitalRead(PIN_CAPTEUR_DROIT);
}

int lire_distance_ultrason() {
  return ultrasonic_12_13.read(CM);
}

bool detecter_obstacle() {
  int dist = lire_distance_ultrason();
  return (dist > 0 && dist < DISTANCE_DETECTION_OBSTACLE);
}

// ============================================================
// FONCTIONS DE MOUVEMENT PRÉCIS (pour trajet prédéfini)
// ============================================================

// Avancer une distance précise (en cm)
// Note : À CALIBRER selon ton robot
void avancer_distance(int distance_cm) {
  // Calcul approximatif : ~100ms par 10cm à vitesse 155
  // AJUSTE CETTE VALEUR selon tes tests
  int duree = distance_cm * 100; // milliseconds
  
  moteur_avancer(155);
  matrix_display(clear);
  matrix_display(matrix_front);
  delay(duree);
  moteur_arreter();
  delay(200); // Pause pour stabilisation
}

// Tourner à gauche d'un angle précis (en degrés)
// Note : À CALIBRER selon ton robot
void tourner_gauche_angle(int angle) {
  // Calcul approximatif : ~10ms par degré à vitesse 155
  // AJUSTE CETTE VALEUR selon tes tests
  int duree = angle * 10; // milliseconds
  
  moteur_tourner_gauche(155);
  matrix_display(clear);
  matrix_display(matrix_left);
  delay(duree);
  moteur_arreter();
  delay(200); // Pause pour stabilisation
}

// Tourner à droite d'un angle précis (en degrés)
void tourner_droite_angle(int angle) {
  // Calcul approximatif : ~10ms par degré à vitesse 155
  // AJUSTE CETTE VALEUR selon tes tests
  int duree = angle * 10; // milliseconds
  
  moteur_tourner_droite(155);
  matrix_display(clear);
  matrix_display(matrix_right);
  delay(duree);
  moteur_arreter();
  delay(200); // Pause pour stabilisation
}

// Contourner un obstacle et revenir sur le trajet
void contourner_obstacle_trajet() {
  Serial.println("Obstacle detecte - contournement");
  
  moteur_arreter();
  matrix_display(clear);
  matrix_display(matrix_stop);
  delay(500);
  
  // Scanner gauche et droite
  servo_A3.write(160); // Regarder à gauche
  delay(500);
  int distance_L = lire_distance_ultrason();
  delay(100);
  
  servo_A3.write(20); // Regarder à droite
  delay(500);
  int distance_R = lire_distance_ultrason();
  delay(100);
  
  servo_A3.write(90); // Revenir au centre
  delay(300);
  
  Serial.print("Distance G:");
  Serial.print(distance_L);
  Serial.print(" D:");
  Serial.println(distance_R);
  
  // Choisir la meilleure direction et contourner
  if (distance_L > distance_R) {
    // Contourner par la gauche et revenir sur le trajet
    Serial.println("Contournement par la gauche");
    tourner_gauche_angle(90);
    avancer_distance(30);
    tourner_droite_angle(90);
    avancer_distance(25);
    tourner_droite_angle(90);
    avancer_distance(30);
    tourner_gauche_angle(90);
  } 
  else {
    // Contourner par la droite et revenir sur le trajet
    Serial.println("Contournement par la droite");
    tourner_droite_angle(90);
    avancer_distance(30);
    tourner_gauche_angle(90);
    avancer_distance(25);
    tourner_gauche_angle(90);
    avancer_distance(30);
    tourner_droite_angle(90);
  }
  
  Serial.println("Retour sur le trajet - reprise");
}

// ============================================================
// MODE 1: TRAJET PRÉDÉFINI PERSONNALISÉ (Remplace following)
// ============================================================

void trajet_predefini() {
  flag = 0;
  etapeTrajet = 0;
  modeTrajetActif = true;
  
  servo_A3.write(90);
  delay(300);
  matrix_display(clear);
  matrix_display(matrix_smile);
  
  Serial.println("=== MODE: TRAJET PREDEFINI ===");
  
  while (!(flag == 1) && modeTrajetActif) {
    // Vérifier obstacle avant chaque étape
    if (detecter_obstacle()) {
      contourner_obstacle_trajet();
      // Ne pas incrémenter etapeTrajet - on reprend là où on était
      continue;
    }
    
    // ===== DÉFINIS TON TRAJET PERSONNALISÉ ICI =====
    switch(etapeTrajet) {
  case 0:
    Serial.println("S - Segment debut");
    avancer_distance(30);
    etapeTrajet++;
    break;
    
  case 1:
    Serial.println("S - Demi-cercle superieur 1/2");
    tourner_droite_angle(90);
    etapeTrajet++;
    break;
    
  case 2:
    Serial.println("S - Avancer courbe sup");
    avancer_distance(30);
    etapeTrajet++;
    break;
    
  case 3:
    Serial.println("S - Demi-cercle superieur 2/2");
    tourner_droite_angle(90);
    etapeTrajet++;
    break;
    
  case 4:
    Serial.println("S - Segment milieu");
    avancer_distance(35);
    etapeTrajet++;
    break;
    
  case 5:
    Serial.println("S - Demi-cercle inferieur 1/2");
    tourner_gauche_angle(90);
    etapeTrajet++;
    break;
    
  case 6:
    Serial.println("S - Avancer courbe inf");
    avancer_distance(30);
    etapeTrajet++;
    break;
    
  case 7:
    Serial.println("S - Demi-cercle inferieur 2/2");
    tourner_gauche_angle(90);
    etapeTrajet++;
    break;
    
  case 8:
    Serial.println("S - Segment final");
    avancer_distance(30);
    etapeTrajet++;
    break;
    
  default:
    Serial.println("=== PARCOURS EN S TERMINE ===");
    moteur_arreter();
    matrix_display(clear);
    matrix_display(matrix_heart);
    delay(3000);
    matrix_display(clear);
    matrix_display(matrix_smile);
    modeTrajetActif = false;
    flag = 1;
    break;
}
    // Vérifier si commande stop reçue
    if (Serial.available() > 0) {
      ble_val = Serial.read();
      if (ble_val == CMD_STOP) {
        Serial.println("=== TRAJET INTERROMPU ===");
        flag = 1;
        modeTrajetActif = false;
      }
    }
    
    delay(300); // Petite pause entre les étapes
  }
  
  moteur_arreter();
}

// ============================================================
// MODE 2: SUIVI LIGNE AMÉLIORÉ AVEC ÉVITEMENT (Améliore tracking)
// ============================================================

void tracking_ameliore() {
  flag = 0;
  servo_A3.write(90);
  delay(300);
  matrix_display(clear);
  matrix_display(matrix_smile);
  
  Serial.println("=== MODE: SUIVI LIGNE AMELIORE ===");
  
  while (!(flag == 1)) {
    Serial.println("Suivi ligne...");
    
    // PRIORITÉ 1: Vérifier obstacle
    if (detecter_obstacle()) {
      Serial.println("Obstacle sur la ligne!");
      
      moteur_arreter();
      matrix_display(clear);
      matrix_display(matrix_stop);
      delay(500);
      
      // Scanner pour choisir la direction
      servo_A3.write(160);
      delay(500);
      int distance_L = lire_distance_ultrason();
      
      servo_A3.write(20);
      delay(500);
      int distance_R = lire_distance_ultrason();
      
      servo_A3.write(90);
      delay(300);
      
      // Contourner l'obstacle
      if (distance_L > distance_R) {
        Serial.println("Contournement gauche");
        tourner_gauche_angle(45);
        avancer_distance(25);
        tourner_droite_angle(45);
        avancer_distance(35);
        tourner_droite_angle(45);
      } 
      else {
        Serial.println("Contournement droite");
        tourner_droite_angle(45);
        avancer_distance(25);
        tourner_gauche_angle(45);
        avancer_distance(35);
        tourner_gauche_angle(45);
      }
      
      // Chercher la ligne après contournement
      Serial.println("Recherche de la ligne...");
      int tentatives = 0;
      bool ligneRetrouvee = false;
      
      while (tentatives < 50 && !ligneRetrouvee) {
        lire_capteurs_ligne();
        if (L_val == 1 || M_val == 1 || R_val == 1) {
          ligneRetrouvee = true;
          Serial.println("Ligne retrouvee!");
          matrix_display(clear);
          matrix_display(matrix_smile);
        } else {
          moteur_avancer(100); // Avancer lentement
          delay(100);
          tentatives++;
        }
      }
      
      if (!ligneRetrouvee) {
        Serial.println("ERREUR: Ligne non retrouvee - ARRET");
        moteur_arreter();
        matrix_display(clear);
        matrix_display(matrix_stop);
        flag = 1;
        continue;
      }
    }
    
    // PRIORITÉ 2: Suivre la ligne
    lire_capteurs_ligne();
    
    if (M_val == 1) {
      // Ligne au centre
      if (L_val == 1 && R_val == 0) {
        // Légère correction à gauche
        digitalWrite(PIN_MOTEUR_GAUCHE_DIR, LOW);
        analogWrite(PIN_MOTEUR_GAUCHE_PWM, 100);
        digitalWrite(PIN_MOTEUR_DROIT_DIR, HIGH);
        analogWrite(PIN_MOTEUR_DROIT_PWM, 155);
      }
      else if (L_val == 0 && R_val == 1) {
        // Légère correction à droite
        digitalWrite(PIN_MOTEUR_GAUCHE_DIR, HIGH);
        analogWrite(PIN_MOTEUR_GAUCHE_PWM, 155);
        digitalWrite(PIN_MOTEUR_DROIT_DIR, LOW);
        analogWrite(PIN_MOTEUR_DROIT_PWM, 100);
      }
      else {
        // Tout droit
        moteur_avancer(155);
      }
    }
    else {
      // Ligne perdue du centre
      if (L_val == 1 && R_val == 0) {
        // Tourner à gauche
        digitalWrite(PIN_MOTEUR_GAUCHE_DIR, LOW);
        analogWrite(PIN_MOTEUR_GAUCHE_PWM, 100);
        digitalWrite(PIN_MOTEUR_DROIT_DIR, HIGH);
        analogWrite(PIN_MOTEUR_DROIT_PWM, 155);
      }
      else if (L_val == 0 && R_val == 1) {
        // Tourner à droite
        digitalWrite(PIN_MOTEUR_GAUCHE_DIR, HIGH);
        analogWrite(PIN_MOTEUR_GAUCHE_PWM, 155);
        digitalWrite(PIN_MOTEUR_DROIT_DIR, LOW);
        analogWrite(PIN_MOTEUR_DROIT_PWM, 100);
      }
      else {
        // Ligne complètement perdue - arrêt
        moteur_arreter();
        Serial.println("Ligne perdue!");
      }
    }
    
    // Vérifier si commande stop reçue
    ble_val = Serial.read();
    if (ble_val == CMD_STOP) {
      Serial.println("=== SUIVI LIGNE ARRETE ===");
      flag = 1;
    }
  }
  
  moteur_arreter();
}

// ============================================================
// MODES ORIGINAUX (conservés)
// ============================================================

void confinement() {
  flag = 0;
  servo_A3.write(90);
  delay(300);
  matrix_display(clear);
  matrix_display(matrix_smile);
  
  while (!(flag == 1)) {
    Serial.println("confinement");
    lire_capteurs_ligne();
    
    if (L_val == 0 && M_val == 0 && R_val == 0) {
      moteur_avancer(155);
    }
    else {
      moteur_reculer(100);
      delay(500);
      moteur_tourner_droite(155);
      delay(800);
    }
    
    ble_val = Serial.read();
    if (ble_val == CMD_STOP) {
      flag = 1;
    }
  }
}

void avoiding() {
  flag = 0;
  int distance_L = 0;
  int distance_R = 0;
  servo_A3.write(90);
  delay(300);
  
  while (!(flag == 1)) {
    Serial.println("avoiding");
    distance = lire_distance_ultrason();
    
    if (distance > 0 && distance < 20) {
      moteur_arreter();
      matrix_display(clear);
      matrix_display(matrix_stop);
      delay(1000);
      
      servo_A3.write(160);
      delay(500);
      distance_L = lire_distance_ultrason();
      delay(100);
      
      servo_A3.write(20);
      delay(500);
      distance_R = lire_distance_ultrason();
      delay(100);
      
      if (distance_L > distance_R) {
        moteur_tourner_gauche(155);
        matrix_display(clear);
        matrix_display(matrix_right);
        servo_A3.write(90);
        delay(700);
        matrix_display(clear);
        matrix_display(matrix_front);
      }
      else {
        moteur_tourner_droite(155);
        matrix_display(clear);
        matrix_display(matrix_left);
        servo_A3.write(90);
        delay(700);
        matrix_display(clear);
        matrix_display(matrix_front);
      }
    }
    else {
      moteur_avancer(155);
      matrix_display(clear);
      matrix_display(matrix_front);
    }
    
    ble_val = Serial.read();
    if (ble_val == CMD_STOP) {
      flag = 1;
    }
  }
}

// ============================================================
// GESTION COMMANDES BLUETOOTH
// ============================================================

void traiter_commande_bluetooth(char commande) {
  if (commande == CMD_AVANCER) {
    moteur_avancer(speeds);
    matrix_display(clear);
    matrix_display(matrix_front);
  }
  else if (commande == CMD_RECULER) {
    moteur_reculer(speeds);
    matrix_display(clear);
    matrix_display(matrix_back);
  }
  else if (commande == CMD_GAUCHE) {
    moteur_tourner_gauche(speeds);
    matrix_display(clear);
    matrix_display(matrix_right);
  }
  else if (commande == CMD_DROITE) {
    moteur_tourner_droite(speeds);
    matrix_display(clear);
    matrix_display(matrix_left);
  }
  else if (commande == CMD_VITESSE_UP) {
    while (!(ble_val == CMD_STOP)) {
      if (speeds < 255) {
        speeds++;
        matrix_display(clear);
        matrix_display(matrix_tsundere);
        delay(10);
        Serial.println(speeds);
      }
      ble_val = Serial.read();
    }
  }
  else if (commande == CMD_VITESSE_DOWN) {
    while (!(ble_val == CMD_STOP)) {
      if (speeds > 0) {
        speeds--;
        matrix_display(clear);
        matrix_display(matrix_squinting);
        delay(10);
        Serial.println(speeds);
      }
      ble_val = Serial.read();
    }
  }
  else if (commande == CMD_MODE_CONFINEMENT) {
    Serial.println("Commande: Mode Confinement");
    confinement();
  }
  else if (commande == CMD_MODE_SUIVI_LIGNE_AMELIORE) {
    Serial.println("Commande: Mode Suivi Ligne Ameliore");
    tracking_ameliore();
  }
  else if (commande == CMD_MODE_TRAJET_PREDEFINI) {
    Serial.println("Commande: Mode Trajet Predefini");
    trajet_predefini();
  }
  else if (commande == CMD_MODE_AVOIDING) {
    Serial.println("Commande: Mode Evitement");
    avoiding();
  }
  else if (commande == CMD_STOP) {
    moteur_arreter();
    matrix_display(clear);
    matrix_display(matrix_stop);
  }
}

// ============================================================
// SETUP ET LOOP PRINCIPAL
// ============================================================

void setup() {
  // Configuration IIC pour matrice LED
  pinMode(IIC_SCL, OUTPUT);
  pinMode(IIC_SDA, OUTPUT);
  matrix_display(clear);
  
  // Configuration servo
  servo_A3.attach(PIN_SERVO);
  
  // Configuration moteurs
  pinMode(PIN_MOTEUR_GAUCHE_DIR, OUTPUT);
  pinMode(PIN_MOTEUR_GAUCHE_PWM, OUTPUT);
  pinMode(PIN_MOTEUR_DROIT_DIR, OUTPUT);
  pinMode(PIN_MOTEUR_DROIT_PWM, OUTPUT);
  
  // Configuration capteurs de ligne
  pinMode(PIN_CAPTEUR_GAUCHE, INPUT);
  pinMode(PIN_CAPTEUR_CENTRE, INPUT);
  pinMode(PIN_CAPTEUR_DROIT, INPUT);
  
  // Configuration ultrason
  pinMode(PIN_ULTRASONIC_TRIG, OUTPUT);
  pinMode(PIN_ULTRASONIC_ECHO, INPUT);
  
  // Communication série
  Serial.begin(9600);
  
  // État initial
  Serial.println("=================================");
  Serial.println("ROBOT PRET - DEMO AUTONOME");
  Serial.println("=================================");
  Serial.println("U = Trajet predefini");
  Serial.println("X = Suivi ligne ameliore");
  Serial.println("Y = Evitement simple");
  Serial.println("G = Confinement");
  Serial.println("S = STOP");
  Serial.println("=================================");
  
  matrix_display(matrix_smile);
  servo_A3.write(90);
  delay(300);
}

void loop() {
  if (Serial.available() > 0) {
    ble_val = Serial.read();
    traiter_commande_bluetooth(ble_val);
  }
}