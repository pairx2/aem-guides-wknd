document.querySelectorAll('.customize-time-picker [name="starttime"], .customize-time-picker [name="endtime"]').forEach(timePickable => {
	let activePicker = null;
	timePickable.addEventListener("focus", () => {
		if (activePicker) return;

		activePicker = show(timePickable);

		const onClickAway = ({ target }) => {
			if (
				target === activePicker
				|| target === timePickable
				|| activePicker.contains(target)
			) {
				return;
			}

			document.removeEventListener("mousedown", onClickAway);
			timePickable.closest("div.input-group.a-input-grp").removeChild(activePicker);
			activePicker = null;
		};

		document.addEventListener("mousedown", onClickAway);
	});
});

function show(timePickable) {
const picker = buildPicker(timePickable);

timePickable.closest("div.input-group.a-input-grp").appendChild(picker);
return picker;
}

function buildPicker(timePickable) {
const picker = document.createElement("div");
const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(numberToOption);
const minuteOptions = [0, 15, 30, 45].map(numberToOption);

picker.classList.add("time-picker");
picker.innerHTML = `
	<select class="time-picker__select">
		${hourOptions.join("")}
	</select>
	:
	<select class="time-picker__select">
		${minuteOptions.join("")}
	</select>
	<select class="time-picker__select">
		<option value="AM">AM</option>
		<option value="PM">PM</option>
	</select>
`;

const selects = getSelectsFromPicker(picker);

selects.hour.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));
selects.minute.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));
selects.meridiem.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));

if (timePickable.value) {
	const { hour, minute, meridiem } = getTimePartsFromPickable(timePickable);

	selects.hour.value = hour;
	selects.minute.value = minute;
	selects.meridiem.value = meridiem;
}

return picker;
}

function getTimePartsFromPickable(timePickable) {
const pattern = /^(\d+):(\d+) (AM|PM)$/;
const [hour, minute, meridiem] = Array.from(timePickable.value.match(pattern)).splice(1);

return {
	hour,
	minute,
	meridiem
};
}

function getSelectsFromPicker(timePicker) {
const [hour, minute, meridiem] = timePicker.querySelectorAll(".time-picker__select");

return {
	hour,
	minute,
	meridiem
};
}

function getTimeStringFromPicker(timePicker) {
const selects = getSelectsFromPicker(timePicker);

return `${selects.hour.value}:${selects.minute.value} ${selects.meridiem.value}`;
}

function numberToOption(number) {
const padded = number.toString().padStart(2, "0");

return `<option value="${padded}">${padded}</option>`;
}
