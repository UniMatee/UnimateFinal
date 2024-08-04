import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateAnnouncement from '../../components/CreateAnnouncements';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:8080/announcement/all');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    const checkAdminRole = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        const response = await axios.get('http://localhost:8080/user/profile', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });
        setIsAdmin(response.data.role === 'admin');
      } catch (error) {
        console.error('Error checking admin role:', error);
      }
    };

    checkAdminRole();
    fetchAnnouncements();
  }, []);

  const handleCreateAnnouncement = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#ffffff" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Announcements</Text>

      {isAdmin && (
        <TouchableOpacity style={styles.createButton} onPress={handleCreateAnnouncement}>
          <Text style={styles.createButtonText}>+</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={announcements}
        renderItem={({ item }) => (
          <View style={styles.announcement}>
            <Image
              source={{ uri: item.photo }}
              style={styles.photo}
            />
            <View style={styles.content}>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CreateAnnouncement onClose={handleCloseModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  announcement: {
    marginBottom: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  content: {
    padding: 10,
  },
  message: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 14,
    color: '#888',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 10,
  },
});

export default Announcements;
