package main

import (
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"net/http"
)

func sign_up(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "POST" {
		var data map[string]interface{}
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		println("Data received: ",  data["email"].(string),  data["password"].(string))

		w.Write([]byte(`{"message": "Hello from the backend!"}`))
	}
}

func main() {
	// Create a new chi router
	r := chi.NewRouter()

	// Create a new CORS handler
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	})

	// Apply the CORS middleware to the router
	r.Use(corsHandler.Handler)

	// Register the handler function for the "/signup" URL
	r.HandleFunc("/signup", sign_up)

	// Start the web server on port 8080 with the chi router
	fmt.Println("Server started on :8080")
	http.ListenAndServe(":8080", r)
}
