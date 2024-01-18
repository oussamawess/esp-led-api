#include <ESP8266WiFi.h>
#include <WebSocketsClient.h>

const char *ssid = "TOPNETEF4656FC";
const char *password = "61043A9011";
const char *webSocketServer = "sand-inexpensive-dirt.glitch.me"; // Only the host, without protocol or path

WebSocketsClient webSocket;
const int ledPin = D5; // Assuming the LED is connected to pin D5

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  pinMode(ledPin, OUTPUT);

  webSocket.begin(webSocketServer, 80, "/");
  webSocket.onEvent(webSocketEvent);
}

void loop() {
  webSocket.loop();
}

void webSocketEvent(WStype_t type, uint8_t *payload, size_t length) {
  switch (type) {
    case WStype_TEXT: {
      Serial.printf("Received payload: %s\n", payload);

      // Parse JSON payload
      // Assuming the payload looks like: {"id": 1, "state": 1}
      int state = atoi(strstr((const char *)payload, "\"state\":") + 8);

      // Control the LED based on the received state
      digitalWrite(ledPin, state == 1 ? HIGH : LOW);
      break;
    }
    default:
      break;
  }
}
