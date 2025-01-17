# Modah

Modah is an e-commerce application built with React Native and Expo, designed to deliver a smooth and modern shopping experience. This repository contains the frontend implementation of the app, including dynamic routing, a responsive design, and mock data for placeholders. Future updates will integrate backend APIs for real-world functionality.

## Features

### Splash Screen
- Displays a splash animation on app startup.
- Smooth transition to the authentication page.

### Authentication
- Sign-up and sign-in pages.
- Placeholder for user session persistence using PostgreSQL.

### Main Pages
1. **Home**
   - Displays featured products and categories.
   - Includes a dynamic Women category page (`women.tsx`).

2. **Search**
   - Search bar for product exploration.
   - Divided into:
      - Suggested for You: Horizontal scrolling section with tall images.
      - Recently Viewed: Grid of small square images with horizontal scrolling.

3. **MyModah**
   - Placeholder for personalized user content.

4. **Bag**
   - Dynamic capabilities to handle cart items and checkout.

5. **Account**
   - User profile and settings.

### Item Pages
- Dynamic routing to view product details (`/items/:id`).
- Features include:
   - Image carousel with scroll indicators.
   - Item description and seller information.
   - Recommendations for similar items and sellers.
   - Persistent bottom bar for pricing and purchase options.

## File Structure
```
app/
├── _splash.tsx
├── auth/
│   ├── signIn.tsx
│   ├── signUp.tsx
├── (tabs)/
│   ├── index.tsx (Home Page)
│   ├── search.tsx
│   ├── bag.tsx
│   ├── account.tsx
├── homepages/
│   ├── women.tsx
├── searchpages/
│   ├── suggested/seeAll.tsx
│   ├── recentlyViewed/seeAll.tsx
├── items/
│   ├── [id].tsx
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/modah.git
   cd modah
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo server:
   ```bash
   npm start
   ```

4. Scan the QR code in your terminal using the Expo Go app to view the app on your device.

## Future Plans
- Backend integration using PostgreSQL.
- Real-time product updates.
- Enhanced search and recommendation algorithms.

## Contributing
This project is not licensed for modification or redistribution. If you have ideas or suggestions, please open an issue to discuss them.

## License
All rights reserved. This repository is not licensed for modification, redistribution, or commercial use. For questions about usage, please contact [Your Name/Email].

## Contact
For questions or suggestions, feel free to reach out to [Shazeb](mailto:shazeb.wani@gmail.com).
