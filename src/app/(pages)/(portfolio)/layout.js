"use client"
import { Inter } from 'next/font/google'
import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import Portfolionavigation from '../../(components)/(classic)/(portfolionav)/pnav';
import './layout.css'

export function imageZoomLayout(){
  const images = document.querySelectorAll('.image-container img');
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);

  let currentIndex = 0;

  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      overlay.classList.add('show');
      displayImage();
    });
  });

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay || event.target.classList.contains('close')) {
      overlay.classList.remove('show');
    }
  });

  function displayImage() {
    const image = document.createElement('img');
    image.src = images[currentIndex].src;
    image.classList.add('overlay-image');
    overlay.innerHTML = '';
    overlay.appendChild(image);

    const prevButton = document.createElement('button');
    prevButton.classList.add('prev');
    prevButton.setAttribute('id', 'previousbtn');
    prevButton.setAttribute('class', 'btn');
    prevButton.innerHTML = '<';
    overlay.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.classList.add('next');
    nextButton.setAttribute('id', 'nextbtn');
    nextButton.setAttribute('class', 'btn');
    nextButton.innerHTML = '>';
    overlay.appendChild(nextButton);

    prevButton.addEventListener('click', () => {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = images.length - 1;
      }
      displayImage();
    });

    nextButton.addEventListener('click', () => {
      currentIndex++;
      if (currentIndex >= images.length) {
        currentIndex = 0;
      }
      displayImage();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 37) {
      document.querySelector("#previousbtn").click();
    } else if (event.keyCode === 39) {
      document.querySelector("#nextbtn").click();
    }
  });
}


export default function Layout({ children }) {
  return (
            <div className="all">
              {children}
              <Portfolionavigation styles={{alignSelf:'flex-start', width:'100%'}}/>
            </div>
  )
}

