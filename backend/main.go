package main

import (
	"log"
	"net/http"
	"github.com/rs/cors"
)

func main() {
	mux := http.NewServeMux()

	// Set up CORS middleware
	handler := cors.Default().Handler(mux)

	log.Println("Server running on http://localhost:8080")
	err := http.ListenAndServe(":8080", handler)
	if err != nil {
		log.Fatalf("Server failed: %s", err)
	}
}