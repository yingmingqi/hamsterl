package handler

/* handler
此文件存放 API
*/

import (
	"fmt"
	"net/http"
)

// CatLog Api return JSON
func CatLog(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Config")
}
