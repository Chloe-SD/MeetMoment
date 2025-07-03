# MeetMoment - Android Scheduling Application

**React Native mobile app for group scheduling with real-time availability matching**

📱 **Android App** | 🌐 **[Web Version](https://github.com/Chloe-SD/meetmoment-webapp)** | 🚀 **[Live Web Demo](https://meetmoment-webapp.vercel.app/)**

## 🚀 What It Does

Native Android application that simplifies group scheduling by finding common availability across multiple participants. Built with React Native and Firebase for seamless real-time collaboration.

### Key Features
- **Smart Meeting Creation** - Define date ranges and available time blocks (60-minute intervals)
- **Real-Time Synchronization** - Live updates across all participants using Firebase
- **Meeting Request System** - Send/receive invitations with unique meeting codes
- **Complete Schedule Control** - Create, join, or leave meetings with full user autonomy
- **Cross-Platform Sync** - Shared database with web application for platform flexibility

## 🛠️ Technical Stack

**Framework:** React Native CLI  
**Database:** Firebase Firestore with real-time listeners  
**Authentication:** Firebase Auth (email/password)  
**Development:** Android Studio  
**State Management:** React hooks with Firebase integration  

## 📱 App Architecture

### Core Screens
- **Home** - Meeting dashboard with delete/leave functionality
- **New Meeting** - Comprehensive meeting creation with date and time selection
- **Requests** - Meeting invitations with search and code-based joining
- **Profile** - User management with secure logout

### Key Algorithms
- **Availability Processing** - Converts user time blocks into standardized format
- **Real-Time Sync** - Firebase listeners maintain consistent state across devices
- **Meeting Code System** - Unique identifiers for secure meeting access

## 🔗 Cross-Platform Integration

This Android app shares a unified Firebase backend with the **[MeetMoment web application](https://github.com/Chloe-SD/meetmoment-webapp)**, enabling:
- **Seamless Platform Switching** - Access same meetings from web or mobile
- **Real-Time Cross-Platform Updates** - Changes sync instantly between platforms
- **Consistent User Experience** - Unified data model across all interfaces

## 🚀 Development Setup

### Prerequisites
- React Native CLI
- Android Studio
- Node.js

### Installation
```bash
# Clone repository
git clone https://github.com/Chloe-SD/MeetMoment.git
cd MeetMoment

# Install dependencies
npm install

# Start Metro server
npm start

# Run on Android (in separate terminal)
npx react-native run-android
```

## 👥 Team Development

**Group Project** - Collaborative development with Jaeeun Lee, Chloe Nibali, and Donald Jans Uy  
**Individual Contributions** - Algorithm design, Firebase integration, UI implementation  
**Cross-Platform Extension** - Personal project expanding to web platform  

## 🎯 Development Highlights

**Complex State Management** - Real-time meeting data across multiple users  
**Native Mobile Development** - React Native with platform-specific optimizations  
**Backend Integration** - Firebase Firestore with authentication and real-time updates  
**Team Collaboration** - Agile development with version control and code reviews  

---

**Tech Stack:** React Native, Firebase, Android Studio



