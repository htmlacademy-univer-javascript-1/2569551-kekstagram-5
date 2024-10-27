function checkMeetingTime(startTime, endTime, meetingStart, meetingDuration) {

  function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const startTimeMinutes = timeToMinutes(startTime);
  const endTimeMinutes = timeToMinutes(endTime);
  const meetingStartMinutes = timeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= startTimeMinutes && meetingEndMinutes <= endTimeMinutes;
}
checkMeetingTime('8:00', '17:30', '14:00', 90);
checkMeetingTime('8:0', '10:0', '8:0', 120);
checkMeetingTime('08:00', '14:30', '14:00', 90);
checkMeetingTime('14:00', '17:30', '08:0', 90);
checkMeetingTime('8:00', '17:30', '08:00', 900);
