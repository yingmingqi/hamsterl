package main

import (
	"fmt"
	"hamsterl/controller"
	"log"
	"net/http"
	"time"
)

func main() {
	router := controller.Router()

	srv := &http.Server{
		Handler:      router,
		Addr:         "127.0.0.1:80",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	fmt.Println(time.Now().Format("2006-01-02T15:04:05Z07:00"), " - Services Start")
	err := srv.ListenAndServe()
	if err != nil {
		log.Fatalln("ListenAndServe err:", err)
	}
}
