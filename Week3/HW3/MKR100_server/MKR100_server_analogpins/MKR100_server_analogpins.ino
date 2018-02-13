//HW3
//Connected Devices Spring 2018
//by RSofiaC
//using example code from Tom Igoe's book "Making things talk" Chapter 4 Excercise 6

#include <SPI.h>
#include <WiFi101.h>
#include "config.h"

WiFiServer server(80);


void setup() {
  Serial.begin(9600);
  while (WiFi.status() != WL_CONNECTED) {
  Serial.print("Attempting to connect to Network: ");
  Serial.println(ssid);
  WiFi.begin(ssid ,password);
  delay(2000);

  pinMode(A0, OUTPUT);
  pinMode(A1, OUTPUT);
  pinMode(A2, OUTPUT);
  }
  server.begin();

  Serial.print("To see this device's web interface go to: http://");
  IPAddress ip = WiFi.localIP();
  Serial.println(ip);
}

void loop() {
 WiFiClient client = server.available();
 while (client.connected()) {
  if (client.available()) {
   String request = client.readStringUntil('\n');
    Serial.println(request);
  if (request.length() <= 2) {
//     client.println("HTTP 200 OK\n");
      String response = makeResponse();
      client.println(response);
  delay (10);
  if (client.connected()) {
  client.stop();
  }
  }
  }
 }

}

String makeResponse(){
  String result = "HTTP /1.1 200 OK\n";
  result += "Content-Type: text/html\n\n";
  result += "<!doctype>\n";
  result += "<html><head><title>";
  result += "Hello from Arduino </title>,/head>";
  result += "\n<body>\n";

  for (int analogChannel = 0; analogChannel < 3; analogChannel++) {
  result += "analog input ";
  result += analogChannel;
  result += " is ";
  result += analogRead(analogChannel);
  result += "<br />\n";
  }
  result += "</body></html>\n\n";
  return result;
}


