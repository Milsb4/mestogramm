'use client';
import { useCardContext } from "@/utils/context/CardContext";
import { useState } from "react";

export default function AddModalPhoto() {
  const { addCard } = useCardContext();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    addCard({title, url});
    setTitle('');
    setUrl('');
  }


  return (
    <div className="p-8">
    
      {/* Модальное окно */}
      <div className="modal fade" id="addPhoto" tabIndex={-1}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            
            <div className="modal-header bg-black text-white">
              <h4 className="modal-title">Добавить новую фотографию</h4>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body bg-black">
              <label className="form-label text-white" htmlFor="customFile">Вставте или загрузите сюда фотографию</label>
            {/*<input type="file" className="form-control bg-black" id="customFile"
              onChange={(e) => setUrl(e.currentTarget.value)} /> */}
              <input type="email" className="mt-3 form-control" id="exampleFormControlInput1" placeholder="Введите url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              />
              <input type="email" className="mt-3 form-control" id="exampleFormControlInput1" placeholder="Введите название"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="modal-footer bg-black">
              <button type="button" className="btn border text-white" data-bs-dismiss="modal">
                Отмена
              </button>
              <button 
              data-bs-dismiss="modal"
              type="button" 
              className="btn border text-white"
              onClick={(e) => {handleSubmit(e)}}
              >  
                Готово!
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}