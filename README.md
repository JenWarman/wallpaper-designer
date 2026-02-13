# Wallpaper Designer

**Wallpaper Designer** is a web application that allows the user to design custom wallpaper products and track their order through production and delivery. 

![iphone view](./public/mobile.png)

## Project Overview

**Wallpaper Designer** provides a personalised product design and order tracking experience. Users can configure bespoke wallpaper designs using interactive design tools, preview results in real time and follow their order's progress. 

## Project Objectives

- **User Engagement** 
Enable users to create, save, edit, archive and order custom wallpaper designs using an intuitive design interface.
- **Highly Configurable Designs** 
Provide control over themes, design motifs, colours, scales and pattern repeat styles to support a fully user-driven design experience.
- **Transparent Order Tracking**
Allow users to track their order through the production stage via a clear wizard style dashboard.

## Application Features

- **User Authentication and Accounts** 
Users can access design tools without an account. Authentication is only required when saving designs or placing an order.
Account creation and authentication are handled via Supabase, using a Postgres database with row-level security.
- **API Driven Architecture** 
Design configurations and user data are retrieved through custom API endpoints, keeping frontend logic clean and simplifying backend workflows.
- **Design Configuration** 
Design selections are made through dropdown controls and rendered in real time. Each selection contributes to a generated configuration URL, which represents the design data and is stored in the database.
- **Real Time Design Visualisation** 
Users can preview their designs in two formats:
  * A Tile view showing a repeatable pattern swatch.
  * A Demo view representing a real-world room environment to better visualise scale and appearance.
- **Design Management** 
Users can save designs for later editing, archive designs they are unsure about, and remove them at a later stage if needed.
- **Order Custom Products** 
Users enter wall dimensions to calculate total quantity of wallpaper and pricing dynamically before placing an order.
- **Order Tracking & Notifcations** 
Orders progress through clearly defined stages: order placed, production, packing, shipping, and delivery. Users can view order status in the “Your Orders” section and receive real-time in-app notifications when their order advances to the next stage
- **Mobile First Design** 
The application was built with a mobile-first approach and scales cleanly across tablet and desktop breakpoints.

## Tech Stack

- **Language:** TypeScript.
- **Frontend:** React and Redux.
- **Styling:** Sass.
- **Backend & Auth:** Supabase(Postgres, authentication, row level security).

### Prerequisites

- Install [Node.js](https://nodejs.org/) which includes [Node Package Manager](https://npmjs.com/).

### Installation

1. **Clone Repository**

```bash
git@github.com:JenWarman/wallpaper-designer.git
```
2. **Navigate to Project Directory**

```bash
cd into wallpaper-designer
```
3. **Install Dependencies**

```bash
npm install
```
4. **Start Application**

```bash
npm run dev
```
Once the server is running, open your browser and navigate to `http://localhost:5137/`. The application will autmatically reload whenever you modify any of the source files. 

## Contact

- **Project Developer:** Jen Warman
- **Contact:** [LinkedIn](https://linkedin.com/in/jen-warman-38198a172/){:target="_blank"}
- **Portfolio:** [Jen Warman](https://jen-warman-portfolio.netlify.app/){:target="_blank"}

