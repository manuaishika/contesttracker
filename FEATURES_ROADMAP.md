# Feature Roadmap & Ideas

## ✅ Already Implemented

- Contest tracking from 6 platforms
- Authentication (Email/Password, Google, GitHub)
- Reminders system
- Favorites/bookmarks
- Admin dashboard (user stats, platform distribution)
- Notification preferences (app, email, calendar)
- Settings page

## 🚀 Next Features to Add

### High Priority

1. **Platform Handle Linking**
   - Let users manually enter their Codeforces/LeetCode handles
   - Fetch and display real ratings from APIs
   - Show rating history graphs

2. **Email Notifications**
   - Set up Supabase Edge Function or use service like Resend
   - Send email reminders before contests
   - Email digest of upcoming contests

3. **Calendar Integration**
   - Generate iCal files for reminders
   - Google Calendar export
   - Add contests directly to user's calendar

4. **Contest Calendar View**
   - Month/week view of all contests
   - Visual calendar with contest markers
   - Click to see contest details

### Medium Priority

5. **User Profile Page**
   - Edit username, bio
   - View linked platforms
   - Profile stats (contests participated, etc.)

6. **Contest Details Modal**
   - Click contest to see full details
   - Problem count, difficulty, registration link
   - Share contest link

7. **Rating History Charts**
   - Line graphs showing rating over time
   - Compare ratings across platforms
   - Rating predictions

8. **Contest Recommendations**
   - Suggest contests based on user's skill level
   - "You might like" section
   - Difficulty matching

9. **Search & Filters Enhancement**
   - Filter by difficulty
   - Filter by duration
   - Sort by date, platform, difficulty
   - Save filter presets

### Nice to Have

10. **Social Features**
    - Compare ratings with friends
    - Leaderboard
    - Share contest participation
    - Follow other users

11. **Contest Analytics**
    - Track participation rate
    - Best/worst performance
    - Platform preferences
    - Activity heatmap

12. **Mobile App**
    - React Native version
    - Push notifications
    - Offline mode

13. **Browser Extension**
    - Quick contest view
    - Notification badge
    - One-click reminder

14. **Contest Predictions**
    - ML model to predict contest difficulty
    - Expected rating change
    - Contest outcome predictions

15. **Practice Mode**
    - Link to practice problems
    - Problem recommendations
    - Study plans

## 🎯 Recommended Next Steps

1. **Fix OAuth** (see OAUTH_FIX.md)
2. **Add platform handle linking** (manual entry in settings)
3. **Implement email notifications** (Supabase Edge Function)
4. **Add calendar export** (iCal generation)
5. **Create contest calendar view** (visual calendar)

## 💡 Quick Wins

- Add "Copy contest link" button
- Add contest countdown timer
- Add "Mark as participated" feature
- Add contest difficulty badges
- Add platform-specific color themes
- Add dark/light mode toggle (if you want)
