// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
// import { Card, IconButton } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const Schedule = () => {
//   const [schedule, setSchedule] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch the schedule data from the API
//     const fetchSchedule = async () => {
//       try {
//         const response = await fetch('https://run.mocky.io/v3/764d4b8a-3be0-4663-9961-f0e1710947a6');
//         const data = await response.json();
//         setSchedule(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching schedule:', error);
//         setLoading(false);
//       }
//     };

//     fetchSchedule();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.date}>06</Text>
//         <View>
//           <Text style={styles.day}>Mon</Text>
//           <Text style={styles.monthYear}>July, 2024</Text>
//         </View>
//       </View>
//       <ScrollView horizontal style={styles.week}>
//         {['04', '05', '06', '07', '08', '09', '10'].map((date, index) => (
//           <View
//             key={index}
//             style={[styles.dayContainer, date === '06' && styles.selectedDay]}>
//             <Text style={styles.weekDay}>{['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}</Text>
//             <Text style={styles.weekDate}>{date}</Text>
//           </View>
//         ))}
//       </ScrollView>
//       <ScrollView style={styles.schedule}>
//         {schedule.map((course, index) => (
//           <Card key={index} style={[styles.card, { backgroundColor: course.color }]}>
//             <Card.Content>
//               <View style={styles.courseHeader}>
//                 <Text style={styles.courseTime}>{course.time}</Text>
//                 <IconButton icon="bell-outline" size={20} />
//               </View>
//               <Text style={styles.courseTitle}>{course.title}</Text>
//               <Text style={styles.courseSubtitle}>{course.subtitle}</Text>
//               <View style={styles.courseFooter}>
//                 <View style={styles.locationContainer}>
//                   <Icon name="room" size={16} color="#555" />
//                   <Text style={styles.courseLocation}>{course.location}</Text>
//                 </View>
//                 <Text style={styles.courseTeacher}>{course.teacher}</Text>
//               </View>
//             </Card.Content>
//           </Card>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     padding: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   date: {
//     fontSize: 48,
//     fontWeight: 'bold',
//     marginRight: 16,
//   },
//   day: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   monthYear: {
//     fontSize: 16,
//     color: '#888',
//   },
//   week: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   dayContainer: {
//     alignItems: 'center',
//     padding: 8,
//     borderRadius: 4,
//   },
//   selectedDay: {
//     backgroundColor: '#E0E0E0',
//   },
//   weekDay: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   weekDate: {
//     fontSize: 16,
//   },
//   schedule: {
//     flex: 1,
//   },
//   card: {
//     marginBottom: 16,
//   },
//   courseHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   courseTime: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   courseTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 8,
//   },
//   courseSubtitle: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 8,
//   },
//   courseFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   courseLocation: {
//     marginLeft: 4,
//     fontSize: 14,
//     color: '#555',
//   },
//   courseTeacher: {
//     fontSize: 14,
//     color: '#555',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Schedule;