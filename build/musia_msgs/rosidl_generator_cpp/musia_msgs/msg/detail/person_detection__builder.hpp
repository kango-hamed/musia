// generated from rosidl_generator_cpp/resource/idl__builder.hpp.em
// with input from musia_msgs:msg/PersonDetection.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/msg/person_detection.hpp"


#ifndef MUSIA_MSGS__MSG__DETAIL__PERSON_DETECTION__BUILDER_HPP_
#define MUSIA_MSGS__MSG__DETAIL__PERSON_DETECTION__BUILDER_HPP_

#include <algorithm>
#include <utility>

#include "musia_msgs/msg/detail/person_detection__struct.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


namespace musia_msgs
{

namespace msg
{

namespace builder
{

class Init_PersonDetection_confidence
{
public:
  explicit Init_PersonDetection_confidence(::musia_msgs::msg::PersonDetection & msg)
  : msg_(msg)
  {}
  ::musia_msgs::msg::PersonDetection confidence(::musia_msgs::msg::PersonDetection::_confidence_type arg)
  {
    msg_.confidence = std::move(arg);
    return std::move(msg_);
  }

private:
  ::musia_msgs::msg::PersonDetection msg_;
};

class Init_PersonDetection_distance_m
{
public:
  explicit Init_PersonDetection_distance_m(::musia_msgs::msg::PersonDetection & msg)
  : msg_(msg)
  {}
  Init_PersonDetection_confidence distance_m(::musia_msgs::msg::PersonDetection::_distance_m_type arg)
  {
    msg_.distance_m = std::move(arg);
    return Init_PersonDetection_confidence(msg_);
  }

private:
  ::musia_msgs::msg::PersonDetection msg_;
};

class Init_PersonDetection_person_detected
{
public:
  explicit Init_PersonDetection_person_detected(::musia_msgs::msg::PersonDetection & msg)
  : msg_(msg)
  {}
  Init_PersonDetection_distance_m person_detected(::musia_msgs::msg::PersonDetection::_person_detected_type arg)
  {
    msg_.person_detected = std::move(arg);
    return Init_PersonDetection_distance_m(msg_);
  }

private:
  ::musia_msgs::msg::PersonDetection msg_;
};

class Init_PersonDetection_header
{
public:
  Init_PersonDetection_header()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_PersonDetection_person_detected header(::musia_msgs::msg::PersonDetection::_header_type arg)
  {
    msg_.header = std::move(arg);
    return Init_PersonDetection_person_detected(msg_);
  }

private:
  ::musia_msgs::msg::PersonDetection msg_;
};

}  // namespace builder

}  // namespace msg

template<typename MessageType>
auto build();

template<>
inline
auto build<::musia_msgs::msg::PersonDetection>()
{
  return musia_msgs::msg::builder::Init_PersonDetection_header();
}

}  // namespace musia_msgs

#endif  // MUSIA_MSGS__MSG__DETAIL__PERSON_DETECTION__BUILDER_HPP_
