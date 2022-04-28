import { useEffect, useState } from 'react';

const useCountDownTimer = (times) => {
	const [time, setTime] = useState(times);

	let minutes;
	let seconds;

	useEffect(() => {
		setInterval(() => {
			console.log(time);
			if (time > 0) {
				minutes = Math.floor(time / 60);
				seconds = time % 60;
				time--;
				seconds = seconds < 10 ? `0${seconds}` : seconds;
				console.log(
					`Temps restant ${minutes} et ${seconds} and time is ${time}`
				);
			} else {
				console.log('Commande est prete');
			}
		}, 1000);
	}, [time]);

	return { minutes, seconds };
};

export default useCountDownTimer;
