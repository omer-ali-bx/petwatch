# PetWatch - Pet Adoption App

A beautiful and modern React Native app for pet adoption, built with Expo and React Native Paper.


## Features

### 🏠 Home Screen - Pet List
- Browse available pets from a curated list
- Modern card-based UI with shadows and rounded edges
- Each pet card displays name, age, breed, and description
- Smooth animations on card interactions
- Tap any card to view detailed pet information

### 🐾 Pet Details Screen
- Full-screen pet images
- Comprehensive pet information (name, age, breed, gender)
- Detailed descriptions
- Gradient "Adopt" button with custom branding
- Clean, modern design with Material Design principles

### 💳 Adoption Payment Simulation
- Mock payment form with validation
- Fields: Name, Card Number, Expiry Date, CVV
- Real-time form validation
- Display user's address for delivery
- Gradient submit button
- Success confirmation with celebration message
- Snackbar notifications for user feedback

### 📍 Location Screen
- Request and display user's current location
- Show formatted address using reverse geocoding
- Google Maps placeholder image with marker
- Display coordinates (latitude, longitude, accuracy)
- Location permission handling
- Information about nearby pet services
- Gradient "View on Map" button
- Refresh location functionality

### ℹ️ About Screen
- App information and mission statement
- Feature highlights
- Contact information
- Legal information
- Updated branding and app name

## Technical Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **UI Library**: React Native Paper
- **Icons**: Material Icons (@expo/vector-icons)
- **Location**: Expo Location with reverse geocoding
- **Animations**: React Native LayoutAnimation
- **Gradients**: Expo Linear Gradient
- **Testing**: Jest with React Native Testing Library
- **State Management**: React Context API

## Components

### GradientButton
- Custom gradient button component
- Uses primary and secondary brand colors
- Supports disabled state and custom styling
- Consistent across all screens

### LocationContext
- React Context for sharing location data
- Provides user location and formatted address
- Used across Location and Payment screens

## Project Structure

```
PetWatch/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── PetDetailsScreen.js
│   │   ├── PaymentScreen.js
│   │   ├── LocationScreen.js
│   │   └── AboutScreen.js
│   ├── components/
│   │   └── GradientButton.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   ├── assets/
│   │   └── images/
│   │       ├── buddy.png
│   │       ├── lucy.png
│   │       ├── max.png
│   │       ├── daisy.png
│   │       ├── whiskers.png
│   │       └── map-placeholder.png
│   ├── data/
│   │   └── pets.json
│   └── utils/
│       └── LocationContext.js
├── __tests__/
│   ├── HomeScreen.test.js
│   ├── PaymentScreen.test.js
│   ├── GradientButton.test.js
│   ├── LocationContext.test.js
│   └── simple.test.js
├── App.js
├── babel.config.js
├── jest.setup.js
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)
- Expo Go app on your mobile device (for testing on real device)

### Installation

1. **Clone or extract the project**
   ```bash
   cd PetWatch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on device/simulator**
   - **iOS Simulator**: Press `i` in the terminal or click "Run on iOS simulator" in Expo Dev Tools
   - **Android Emulator**: Press `a` in the terminal or click "Run on Android device/emulator" in Expo Dev Tools
   - **Physical Device**: Scan the QR code with Expo Go app (iOS) or Camera app (Android)

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator (macOS only)
- `npm run web` - Run in web browser
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode

## Testing

The app includes comprehensive unit tests using Jest and React Native Testing Library:

- **Component Tests**: GradientButton, LocationContext
- **Screen Tests**: HomeScreen, PaymentScreen
- **Integration Tests**: Location and address functionality
- **Utility Tests**: Basic functionality verification

Run tests with:
```bash
npm test
```

## Features in Detail

### Branding
- **App Name**: PetWatch
- **Logo**: Gradient logo with pet-friendly design
- **Colors**: 
  - Primary: rgb(235,66,73) - Warm red
  - Secondary: rgb(242,129,71) - Orange accent
- **Gradient Buttons**: Bottom-left to top-right gradient using brand colors

### Location Features
- **Address Resolution**: Converts GPS coordinates to human-readable addresses
- **Map Visualization**: Google Maps-style placeholder with location marker
- **Context Sharing**: Location data shared between screens using React Context
- **Error Handling**: Graceful handling of location permission denials

### Enhanced UX
- **Visual Feedback**: Loading states, error messages, success confirmations
- **Consistent Design**: Unified color scheme and typography
- **Responsive Layout**: Works seamlessly on iOS and Android
- **Accessibility**: Proper touch targets and contrast ratios

### Navigation
- **Bottom Tab Navigation**: Three main tabs (Home, Location, About)
- **Stack Navigation**: Nested navigation for pet details and payment flow
- **Smooth Transitions**: Native navigation animations

### Data Management
- **Local JSON Data**: Pet information stored in local JSON file
- **Image Assets**: High-quality pet images included
- **State Management**: React hooks for local state management

### Animations
- **Card Animations**: Smooth animations on card tap
- **Layout Animations**: Automatic layout transitions
- **Loading States**: Activity indicators for async operations

## Mock Data

The app includes 5 sample pets:
- **Buddy** - Golden Retriever, 2 years old
- **Lucy** - Domestic Shorthair cat, 1 year old
- **Max** - German Shepherd, 3 years old
- **Daisy** - Beagle puppy, 6 months old
- **Whiskers** - Siamese cat, 4 years old

## Development Notes

### Dependencies
- `expo-linear-gradient` - For gradient buttons
- `expo-location` - Enhanced location services with reverse geocoding
- `jest` - Testing framework
- `@testing-library/react-native` - Testing utilities

### Context API Usage
- LocationContext provides global access to user location and address
- Eliminates prop drilling between Location and Payment screens
- Maintains location state across app navigation

### Testing Strategy
- Unit tests for individual components
- Integration tests for context providers
- Mock implementations for external dependencies
- Comprehensive coverage of user interactions

### Image Handling
- Images are stored in `src/assets/images/`
- Image mapping function handles dynamic image loading
- Fallback image provided for missing assets

### Form Validation
- Real-time validation for payment form
- Custom validation rules for card number, expiry, and CVV
- User-friendly error messages

### Location Services
- Requests user permission for location access
- Handles permission denial gracefully
- Provides fallback UI for location errors

## Future Enhancements

- Integration with real pet adoption APIs
- User authentication and profiles
- Push notifications for available pets
- Advanced search and filtering
- Real-time chat with shelters
- Pet care tips and resources
- Social sharing features
- Offline support
- Favorites and saved pets
- Real payment processing

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **Test failures**
   ```bash
   npm test -- --clearCache
   ```

3. **Location permission issues**
   - Ensure location services are enabled on device
   - Check app permissions in device settings

4. **Gradient button not displaying**
   - Verify expo-linear-gradient is installed
   - Check for any console warnings

5. **iOS simulator not opening**
   - Ensure Xcode is installed and iOS Simulator is available
   - Try `npx expo run:ios`

6. **Android emulator issues**
   - Ensure Android Studio is installed and AVD is created
   - Check that Android SDK is properly configured

7. **Image loading issues**
   - Verify image files exist in `src/assets/images/`
   - Check image file names match those in `pets.json`

### Performance Tips

- Use `FlatList` for large lists (already implemented)
- Optimize images for mobile devices
- Use `react-native-fast-image` for better image performance (optional)
- Implement lazy loading for large datasets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add/update tests as needed
5. Test thoroughly on both iOS and Android
6. Submit a pull request

## License

This project is for demonstration purposes. All rights reserved.

## Contact

For questions or support, please contact the development team.

---

**Built with ❤️ using React Native and Expo**

**PetWatch - Connecting pets with loving families**
