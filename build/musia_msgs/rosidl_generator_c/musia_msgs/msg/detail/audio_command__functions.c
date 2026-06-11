// generated from rosidl_generator_c/resource/idl__functions.c.em
// with input from musia_msgs:msg/AudioCommand.idl
// generated code does not contain a copyright notice
#include "musia_msgs/msg/detail/audio_command__functions.h"

#include <assert.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#include "rcutils/allocator.h"


// Include directives for member types
// Member `header`
#include "std_msgs/msg/detail/header__functions.h"
// Member `payload`
// Member `language`
#include "rosidl_runtime_c/string_functions.h"

bool
musia_msgs__msg__AudioCommand__init(musia_msgs__msg__AudioCommand * msg)
{
  if (!msg) {
    return false;
  }
  // header
  if (!std_msgs__msg__Header__init(&msg->header)) {
    musia_msgs__msg__AudioCommand__fini(msg);
    return false;
  }
  // mode
  // payload
  if (!rosidl_runtime_c__String__init(&msg->payload)) {
    musia_msgs__msg__AudioCommand__fini(msg);
    return false;
  }
  // language
  if (!rosidl_runtime_c__String__init(&msg->language)) {
    musia_msgs__msg__AudioCommand__fini(msg);
    return false;
  }
  // volume
  return true;
}

void
musia_msgs__msg__AudioCommand__fini(musia_msgs__msg__AudioCommand * msg)
{
  if (!msg) {
    return;
  }
  // header
  std_msgs__msg__Header__fini(&msg->header);
  // mode
  // payload
  rosidl_runtime_c__String__fini(&msg->payload);
  // language
  rosidl_runtime_c__String__fini(&msg->language);
  // volume
}

bool
musia_msgs__msg__AudioCommand__are_equal(const musia_msgs__msg__AudioCommand * lhs, const musia_msgs__msg__AudioCommand * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  // header
  if (!std_msgs__msg__Header__are_equal(
      &(lhs->header), &(rhs->header)))
  {
    return false;
  }
  // mode
  if (lhs->mode != rhs->mode) {
    return false;
  }
  // payload
  if (!rosidl_runtime_c__String__are_equal(
      &(lhs->payload), &(rhs->payload)))
  {
    return false;
  }
  // language
  if (!rosidl_runtime_c__String__are_equal(
      &(lhs->language), &(rhs->language)))
  {
    return false;
  }
  // volume
  if (lhs->volume != rhs->volume) {
    return false;
  }
  return true;
}

bool
musia_msgs__msg__AudioCommand__copy(
  const musia_msgs__msg__AudioCommand * input,
  musia_msgs__msg__AudioCommand * output)
{
  if (!input || !output) {
    return false;
  }
  // header
  if (!std_msgs__msg__Header__copy(
      &(input->header), &(output->header)))
  {
    return false;
  }
  // mode
  output->mode = input->mode;
  // payload
  if (!rosidl_runtime_c__String__copy(
      &(input->payload), &(output->payload)))
  {
    return false;
  }
  // language
  if (!rosidl_runtime_c__String__copy(
      &(input->language), &(output->language)))
  {
    return false;
  }
  // volume
  output->volume = input->volume;
  return true;
}

musia_msgs__msg__AudioCommand *
musia_msgs__msg__AudioCommand__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__msg__AudioCommand * msg = (musia_msgs__msg__AudioCommand *)allocator.allocate(sizeof(musia_msgs__msg__AudioCommand), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(musia_msgs__msg__AudioCommand));
  bool success = musia_msgs__msg__AudioCommand__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
musia_msgs__msg__AudioCommand__destroy(musia_msgs__msg__AudioCommand * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    musia_msgs__msg__AudioCommand__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
musia_msgs__msg__AudioCommand__Sequence__init(musia_msgs__msg__AudioCommand__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__msg__AudioCommand * data = NULL;

  if (size) {
    data = (musia_msgs__msg__AudioCommand *)allocator.zero_allocate(size, sizeof(musia_msgs__msg__AudioCommand), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = musia_msgs__msg__AudioCommand__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        musia_msgs__msg__AudioCommand__fini(&data[i - 1]);
      }
      allocator.deallocate(data, allocator.state);
      return false;
    }
  }
  array->data = data;
  array->size = size;
  array->capacity = size;
  return true;
}

void
musia_msgs__msg__AudioCommand__Sequence__fini(musia_msgs__msg__AudioCommand__Sequence * array)
{
  if (!array) {
    return;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();

  if (array->data) {
    // ensure that data and capacity values are consistent
    assert(array->capacity > 0);
    // finalize all array elements
    for (size_t i = 0; i < array->capacity; ++i) {
      musia_msgs__msg__AudioCommand__fini(&array->data[i]);
    }
    allocator.deallocate(array->data, allocator.state);
    array->data = NULL;
    array->size = 0;
    array->capacity = 0;
  } else {
    // ensure that data, size, and capacity values are consistent
    assert(0 == array->size);
    assert(0 == array->capacity);
  }
}

musia_msgs__msg__AudioCommand__Sequence *
musia_msgs__msg__AudioCommand__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__msg__AudioCommand__Sequence * array = (musia_msgs__msg__AudioCommand__Sequence *)allocator.allocate(sizeof(musia_msgs__msg__AudioCommand__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = musia_msgs__msg__AudioCommand__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
musia_msgs__msg__AudioCommand__Sequence__destroy(musia_msgs__msg__AudioCommand__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    musia_msgs__msg__AudioCommand__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
musia_msgs__msg__AudioCommand__Sequence__are_equal(const musia_msgs__msg__AudioCommand__Sequence * lhs, const musia_msgs__msg__AudioCommand__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!musia_msgs__msg__AudioCommand__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
musia_msgs__msg__AudioCommand__Sequence__copy(
  const musia_msgs__msg__AudioCommand__Sequence * input,
  musia_msgs__msg__AudioCommand__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(musia_msgs__msg__AudioCommand);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    musia_msgs__msg__AudioCommand * data =
      (musia_msgs__msg__AudioCommand *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!musia_msgs__msg__AudioCommand__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          musia_msgs__msg__AudioCommand__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!musia_msgs__msg__AudioCommand__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}
