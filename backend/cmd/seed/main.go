package main

import (
	"fmt"

	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/internal/seeder"
	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/config"
	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/database"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		panic(err)
	}

	db, err := database.InitDB(cfg)
	if err != nil {
		panic(err)
	}

	if err := seeder.SeedDefaults(db); err != nil {
		panic(err)
	}

	fmt.Println("seed completed")
}
