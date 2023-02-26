package main

import (
	"fmt"
	"net/http"
	"os"
	"time"
)

func main() {
	// Open the GeoJSON file
	geojsonFile, err := os.Open("india_district.geojson")
	if err != nil {
		panic(err)
	}
	defer geojsonFile.Close()

	// Define an HTTP handler for the "/data" endpoint
	http.HandleFunc("/data", func(w http.ResponseWriter, r *http.Request) {
		// Set the content type header
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// Serve the GeoJSON file
		http.ServeContent(w, r, "data.geojson", time.Now(), geojsonFile)
	})

	// Start the HTTP server
	fmt.Println("Server started at http://localhost:8080")
	err = http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err)
	}
}
