package main

import (
	"log"
	"net/http"
)

// implement auth via this https://www.sohamkamani.com/golang/session-based-authentication/

func main() {
	http.Handle("/frontend/", http.StripPrefix("/frontend", http.FileServer(http.Dir("./frontend/"))))
	http.Handle("/assets/", http.StripPrefix("/assets", http.FileServer(http.Dir("./assets/"))))

	http.HandleFunc("/submit", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./frontend/submit/submit.html")
	})
	log.Fatal(http.ListenAndServe(":8080", nil))
}
