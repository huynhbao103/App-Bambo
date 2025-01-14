import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";

// API URL
const API_URL = "http://192.168.96.217:3000/api/transactions";

export default function HomeScreen() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Lấy userId từ token
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode<{ userId: string }>(token);
          setUserId(decoded.userId);
        }
      } catch (error) {
        console.error("Lỗi khi lấy userId:", error);
      }
    };

    fetchUserId();
  }, []);

  // Lấy danh sách giao dịch từ API
  useEffect(() => {
    if (!userId) return;

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/${userId}`);
        setTransactions(response.data as any[]);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  // Tính tổng thu nhập và chi tiêu từ dữ liệu API
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <StatusBar barStyle="light-content" backgroundColor="#28a745" />

      {loading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#28a745" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          ListHeaderComponent={
            <>
              {/* Header */}
              <View style={tw`bg-green-500 p-5 rounded-b-3xl shadow-md`}>
                <View style={tw`flex-row items-center justify-between`}>
                  <Image
                    source={{
                      uri: "https://randomuser.me/api/portraits/men/1.jpg",
                    }}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View style={tw`flex-1 ml-3`}>
                    <Text style={tw`text-white text-sm`}>Chào mừng,</Text>
                    <Text style={tw`text-white text-lg font-bold`}>User</Text>
                  </View>
                  <Ionicons name="search-outline" size={24} color="white" />
                </View>

                {/* Tổng Thu Nhập & Chi Tiêu */}
                <View style={tw`flex-row justify-between mt-5`}>
                  <View>
                    <Text style={tw`text-white text-sm`}>Thu nhập</Text>
                    <Text style={tw`text-white text-lg font-bold`}>
                      +{totalIncome} đ
                    </Text>
                  </View>
                  <View>
                    <Text style={tw`text-white text-sm`}>Chi tiêu</Text>
                    <Text style={tw`text-white text-lg font-bold`}>
                      {totalExpense} đ
                    </Text>
                  </View>
                </View>
              </View>

              {/* Transaction List Header */}
              <View style={tw`flex-row justify-between mb-3 px-4`}>
                <Text style={tw`text-lg font-bold`}>Lịch sử giao dịch</Text>
                <TouchableOpacity>
                  <Text style={tw`text-blue-500`}>Xem tất cả</Text>
                </TouchableOpacity>
              </View>
            </>
          }
          data={transactions}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View
              style={tw`flex-row items-center bg-white p-4 rounded-lg mb-2 shadow-md mx-4`}
            >
              <FontAwesome
                name={item.type === "income" ? "arrow-up" : "arrow-down"}
                size={24}
                color={item.type === "income" ? "#28a745" : "#dc3545"}
              />
              <View style={tw`flex-1 ml-3`}>
                <Text style={tw`text-lg font-bold`}>{item.category}</Text>
                <Text style={tw`text-gray-500`}>{new Date(item.date).toLocaleDateString()}</Text>
              </View>
              <Text
                style={tw`text-lg font-bold ${item.type === "income" ? "text-green-500" : "text-red-500"}`}
              >
                {item.amount.toLocaleString()} đ
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
