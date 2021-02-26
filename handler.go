// Copyright (c) 2021 The yingmingqi Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"fmt"
	"net/http"
	"text/template"
)

// {
//	url: home
//	Methods: GET
// }
func HandlerFucnHomePage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "Testing!")
}

// {
//	url: text
//	Methods: GET
// }
func HandlerFuncTextHome(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("static/templates/templateTextHomeHtml.html")
	t.Execute(w, nil)
}
