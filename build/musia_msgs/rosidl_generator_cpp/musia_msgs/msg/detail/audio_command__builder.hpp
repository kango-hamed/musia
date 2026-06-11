// generated from rosidl_generator_cpp/resource/idl__builder.hpp.em
// with input from musia_msgs:msg/AudioCommand.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/msg/audio_command.hpp"


#ifndef MUSIA_MSGS__MSG__DETAIL__AUDIO_COMMAND__BUILDER_HPP_
#define MUSIA_MSGS__MSG__DETAIL__AUDIO_COMMAND__BUILDER_HPP_

#include <algorithm>
#include <utility>

#include "musia_msgs/msg/detail/audio_command__struct.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


namespace musia_msgs
{

namespace msg
{

namespace builder
{

class Init_AudioCommand_volume
{
public:
  explicit Init_AudioCommand_volume(::musia_msgs::msg::AudioCommand & msg)
  : msg_(msg)
  {}
  ::musia_msgs::msg::AudioCommand volume(::musia_msgs::msg::AudioCommand::_volume_type arg)
  {
    msg_.volume = std::move(arg);
    return std::move(msg_);
  }

private:
  ::musia_msgs::msg::AudioCommand msg_;
};

class Init_AudioCommand_language
{
public:
  explicit Init_AudioCommand_language(::musia_msgs::msg::AudioCommand & msg)
  : msg_(msg)
  {}
  Init_AudioCommand_volume language(::musia_msgs::msg::AudioCommand::_language_type arg)
  {
    msg_.language = std::move(arg);
    return Init_AudioCommand_volume(msg_);
  }

private:
  ::musia_msgs::msg::AudioCommand msg_;
};

class Init_AudioCommand_payload
{
public:
  explicit Init_AudioCommand_payload(::musia_msgs::msg::AudioCommand & msg)
  : msg_(msg)
  {}
  Init_AudioCommand_language payload(::musia_msgs::msg::AudioCommand::_payload_type arg)
  {
    msg_.payload = std::move(arg);
    return Init_AudioCommand_language(msg_);
  }

private:
  ::musia_msgs::msg::AudioCommand msg_;
};

class Init_AudioCommand_mode
{
public:
  explicit Init_AudioCommand_mode(::musia_msgs::msg::AudioCommand & msg)
  : msg_(msg)
  {}
  Init_AudioCommand_payload mode(::musia_msgs::msg::AudioCommand::_mode_type arg)
  {
    msg_.mode = std::move(arg);
    return Init_AudioCommand_payload(msg_);
  }

private:
  ::musia_msgs::msg::AudioCommand msg_;
};

class Init_AudioCommand_header
{
public:
  Init_AudioCommand_header()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_AudioCommand_mode header(::musia_msgs::msg::AudioCommand::_header_type arg)
  {
    msg_.header = std::move(arg);
    return Init_AudioCommand_mode(msg_);
  }

private:
  ::musia_msgs::msg::AudioCommand msg_;
};

}  // namespace builder

}  // namespace msg

template<typename MessageType>
auto build();

template<>
inline
auto build<::musia_msgs::msg::AudioCommand>()
{
  return musia_msgs::msg::builder::Init_AudioCommand_header();
}

}  // namespace musia_msgs

#endif  // MUSIA_MSGS__MSG__DETAIL__AUDIO_COMMAND__BUILDER_HPP_
