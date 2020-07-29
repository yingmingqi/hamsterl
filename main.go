package main

import "github.com/gorilla/mux"

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/", handlers.Home).Methods("GET")
}
