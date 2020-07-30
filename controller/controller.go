package controller

/*控制层
此文件存放 路由对应处理函数 以及 API 函数
*/

import (
	"hamsterl/handler"
	"net/http"

	"github.com/gorilla/mux"
)

type Conterller struct{}

func Router() *mux.Router {
	Router := mux.NewRouter()

	Router.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	Router.HandleFunc("/", handler.Home).
		Methods("GET")
	Router.HandleFunc("/text", handler.Text).
		Methods("GET")
	Router.HandleFunc("/imageset", handler.ImageSet).
		Methods("GET")
	Router.HandleFunc("/video", handler.Video).
		Methods("GET")
	Router.HandleFunc("/video", handler.Video).
		Methods("GET")
	Router.HandleFunc("/img", handler.Img).
		Methods("GET")
	Router.HandleFunc("/web", handler.Web).
		Methods("GET")
	Router.HandleFunc("/config", handler.Config).
		Methods("GET")

	return Router
}
