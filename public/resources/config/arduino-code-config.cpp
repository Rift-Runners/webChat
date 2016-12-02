//Programa para ligar led de Sentimento
#include <SoftwareSerial.h>

//Variável que recebe o valor do node-red
int nodeRedValue = 0;

void setup () {
  //Inicia a serial
  Serial.begin(9600);
  //Pino vermelho
  pinMode (13, OUTPUT);
  //Pino Amarelo
  pinMode (12, OUTPUT);
  //Pino Verde
  pinMode (11, OUTPUT);
}

void loop () {
  //Verifica estado
  if (Serial.available() > 0) {
    //Recebe o valor do node-red e atribui na variável
    nodeRedValue = Serial.parseInt();

    //Lógica dos leds para o sentiment do node-red
    if (nodeRedValue < -2) {
      //Liga led vermelho
      digitalWrite (13, HIGH); // set o LED
      //Desliga demais led's
      digitalWrite (12, LOW);
      digitalWrite (11, LOW);
    } else if (nodeRedValue >= -2 && nodeRedValue <= 2) {
      //Liga led amarelo
      digitalWrite (12, HIGH); // set o LED
      //Desliga demais led's
      digitalWrite (11, LOW);
      digitalWrite (13, LOW);
    } else {
      //Liga led verde
      digitalWrite (11, HIGH); // set o LED
      //Desliga demais led's
      digitalWrite (12, LOW);
      digitalWrite (13, LOW);
    }
  }
}