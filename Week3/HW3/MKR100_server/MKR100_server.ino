#include <SPI.h>
#include <WiFi101.h>
#include"config.h"

WiFiServer server (80);

void setup() {
 Serial.begin(9600);
 while (WiFi.status() != WL_CONNECTED) {
  Serial.print ("Attempting to connect to Network named: ");
  Serial.println(ssid);
  WiFi.begin (ssid, password);
  delay(2000);
 }

 server.begin();

 Serial.print("To see this device´s web interface, go to http://");
 IPAddress ip = WiFi.localIP();
 Serial.println(ip);
}

void loop() {
  WiFiClient client = server.available();
  while (client.connected()){
    if(client.available()){
      String request = client.readStringUntil('\n');
      Serial.println(request);

    if (request.length() <= 2) {
      client.println("HTTP 200 OK\n");
      delay (10);
      if (client.connected()) {
        client.stop();
      }
    }
    }
  }
  
}
