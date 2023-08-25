package main

// -------- IMPORTS --------
import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"net/http"
	"time"
)

// -------- VARIABLES --------
var ctx context.Context
var db mongo.Database

// -------- LOGIC --------
func SetUpDB() {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.NewClient(clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	// Access the "chatapp" database and "users" collection
	db := client.Database("chatapp")
	fmt.Println(db)
}

func sign_up(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "POST" {
		var data map[string]interface{}
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		user := User{
			data["username"].(string),
			data["email"].(string),
			data["password"].(string)}

		clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
		client, err := mongo.NewClient(clientOptions)
		if err != nil {
			log.Fatal(err)
		}

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		err = client.Connect(ctx)
		if err != nil {
			log.Fatal(err)
		}
		defer client.Disconnect(ctx)

		// Access the "chatapp" database and "users" collection
		db := client.Database("nova-chat")
		users := db.Collection("users")

		result, err := users.InsertOne(ctx, user)

		if err == nil {
			fmt.Println("Inserted one object, ID: ", result.InsertedID)
		} else {
			fmt.Println("Inserting fail!")
		}

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
