package handler

/* handler
此文件存放 静态网页
*/
import (
	"html/template"
	"net/http"
)

// Home 主页
func Home(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("static/templates/main.html")
	t.Execute(w, nil)
}

// Text 文本目录
func Text(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("static/templates/text.html")
	t.Execute(w, nil)
}

func ImageSet(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("static/templates/imageset.html")
	t.Execute(w, nil)
}

func Video(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("static/templates/video.html")
	t.Execute(w, nil)
}

func Img(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("static/templates/img.html")
	t.Execute(w, nil)
}

func Web(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("static/templates/web.html")
	t.Execute(w, nil)
}

func Config(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("static/templates/config.html")
	t.Execute(w, nil)
}
