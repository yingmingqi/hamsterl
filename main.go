// Copyright (c) 2021 The yingmingqi Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func RegisterRouter() *mux.Router {
	Router := mux.NewRouter().StrictSlash(true)

	// 静态路由 路径
	Router.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	// 路由
	Router.HandleFunc("/", HandlerFucnHomePage).
		Methods("GET")
	// 路由
	Router.HandleFunc("/text", HandlerFuncTextHome).
		Methods("GET")
	return Router
}
func main() {

	log.Println(time.Now().Format("2006-01-02T15:04:05Z07:00"), " - Register Router")
	router := RegisterRouter()

	srv := &http.Server{
		Handler:      router,
		Addr:         "127.0.0.1:80",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Println(time.Now().Format("2006-01-02T15:04:05Z07:00"), " - Services Start")

	err := srv.ListenAndServe()
	if err != nil {
		log.Fatalln("ListenAndServe err:", err)
	}
}
