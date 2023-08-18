package app

import (
	"encoding/json"
	"net/http"
)

type Data struct {
	Message string `json:"message"`
}

func main() {
	http.HandleFunc("/api/data", func(w http.ResponseWriter, r *http.Request) {
		data := Data{Message: "Hello from Golang backend!"}
		w.Header().Set("Content-Type", "application/json")
		err := json.NewEncoder(w).Encode(data)
		if err != nil {
			println(err)
		}
	})

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		println(err)
	}
}
