import { Children, FC, ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { clsx } from 'clsx';

import styles from './Slider.module.scss';
import { ButtonIcon } from './ButtonIcon';

import 'swiper/css';
import 'swiper/css/navigation';

export type SliderProps = {
  title: string;
  children: ReactNode;
};

const SLIDES_PER_VIEW = 3;
const SPACE_BETWEEN = 22;

export const Slider: FC<SliderProps> = (props) => {
  const { children } = props;
  return (
    <div className={styles.root}>
      <div id="prev" className={clsx(styles.button, styles.prev)}>
        <ButtonIcon />
      </div>
      <div>
        <h1 className={styles.title}>Testnet games</h1>
        <Swiper
          className={styles.slider}
          navigation={{
            nextEl: '#next',
            prevEl: '#prev',
          }}
          modules={[Navigation]}
          slidesPerView={SLIDES_PER_VIEW}
          spaceBetween={SPACE_BETWEEN}
        >
          {Children.map(children, (child, index) => {
            return <SwiperSlide key={index}>{child}</SwiperSlide>;
          })}
        </Swiper>
      </div>
      <div id="next" className={styles.button}>
        <ButtonIcon />
      </div>
    </div>
  );
};
