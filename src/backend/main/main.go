package main

// -------- IMPORTS --------
import (
	"backend/database"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
)

// -------- VARIABLES --------
var DB *database.Database

// -------- LOGIC --------
func sign_up(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "POST" {
		var data map[string]interface{}
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		user := database.User{
			Username: data["username"].(string),
			Email:    data["email"].(string),
			Password: data["password"].(string)}

		users := DB.GetCollection("users")

		fmt.Println(users.Name())

		result, err := users.InsertOne(context.Background(), user)
		if err == nil {
			fmt.Println("Inserted one object, ID: ", result.InsertedID)
		} else {
			fmt.Println("Inserting failed:", err)                             // Print the error
			http.Error(w, "Inserting failed", http.StatusInternalServerError) // Return an appropriate error response to the client
			return
		}

		w.Write([]byte(`{"message": "Hello from the backend!"}`))
	}
}

func main() {
	// Create a new chi router
	r := chi.NewRouter()

	DB = database.BuildDatabase("nova-chat")

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
