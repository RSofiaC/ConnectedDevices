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
  result += "Hello from Arduino </title></head>";
  result += "<meta http-equiv=\"refresh\" content=\"2\">";
  result += "\n<body>\n";

  result += "<body style='background-color:#";

  int red = analogRead(A0) /4;
  int green = analogRead(A1) /4;
  int blue = analogRead(A2) /4;

  result += String(red, HEX);
  result += String(green, HEX);
  result += String(blue, HEX);

  result += ";'>";

  result += "<p style= color:red;font-size:46px; position: fixed;top: 50%;left: 50%;margin-top: -100px;margin-left: -200px;><strong>MADE BY TANGIBLE STUFFZ</strong> </p>";

   
//  result += String(red, HEX);
//  result += String(green, HEX);
//  result += String(blue, HEX);

  result += "</body></html>\n\n";
  return result;
}


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
  result += "<meta http-equiv=\"refresh\" content=\"3\">";
  result += "\n<body>\n";

  result += "<body bgcolor =#";

  int red = analogRead(A0) /4;
  int green = analogRead(A1) /4;
  int blue = analogRead(A2) /4;

  result += String(red, HEX);
  result += String(green, HEX);
  result += String(blue, HEX);

  result += ">";

  result += "The color of the light on the Arduino is #";
   result += String(red, HEX);
  result += String(green, HEX);
  result += String(blue, HEX);

  result += "</body></html>\n\n";
  return result;
}


