"use client";
import { useCardContext } from "@/utils/context/CardContext";
import { useState, useRef } from "react";

export default function AddModalPhoto() {
  const { addCard } = useCardContext();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Сохраняем сам файл
      setSelectedFile(file);

      // Показываем имя файла
      setFileName(file.name);

      // Создаем временный URL для предпросмотра
      const fileUrl = URL.createObjectURL(file);
      setUrl(fileUrl); // Сохраняем временный URL
    } else {
      setSelectedFile(null);
      setFileName("");
      setUrl(""); // Очищаем URL если файл удален
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Используем временный URL если есть файл, иначе используем введенный URL
    const imageUrl = selectedFile ? url : url;

    if (title && (imageUrl || url)) {
      addCard({ title, url: selectedFile ? url : url });
      setTitle("");
      setUrl("");
      setSelectedFile(null);
      setFileName("");

      // Сбрасываем input file
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="add-photo-modal">
      {/* Модальное окно */}
      <div className="modal fade" id="addPhoto" tabIndex={-1}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content border-0 shadow-2xl overflow-hidden">
            {/* Заголовок */}
            <div className="modal-header bg-white text-black px-6 py-5 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📷</span>
                </div>
                <div>
                  <h4 className="modal-title text-xl font-bold">
                    Добавить новую фотографию
                  </h4>
                  <p className="text-gray-400 text-sm mt-1">
                    Загрузите файл или вставьте ссылку
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="btn-close btn-close-black opacity-80 hover:opacity-100 transition-opacity"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* Тело модального окна */}
            <div className="modal-body bg-gradient-to-b from-gray-900 to-black p-6">
              <div className="space-y-5">
                {/* Заголовок секции */}
                <div className="mb-2">
                  <label
                    className="form-label text-white text-lg font-medium"
                    htmlFor="customFile"
                  >
                    Вставьте или загрузите сюда фотографию
                  </label>
                  <p className="text-gray-400 text-sm mt-1">
                    Поддерживаются: JPG, PNG, GIF, WEBP
                  </p>
                </div>

                {/* Поле для загрузки файла */}
                <div className="mb-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="form-control bg-gray-800 border-2 border-gray-700 
                             text-gray-300 rounded-xl py-3 px-4
                             file:mr-4 file:py-2 file:px-4 
                             file:rounded-lg file:border-0 
                             file:text-sm file:font-medium
                             file:bg-gradient-to-r file:from-blue-600 file:to-blue-700 
                             file:text-white hover:file:from-blue-700 hover:file:to-blue-800
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                             transition-all duration-200 cursor-pointer"
                    id="customFile"
                    accept="image/*"
                    onChange={handleFileChange}
                  />

                  {/* Информация о выбранном файле */}
                  {fileName && (
                    <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 text-sm mb-1 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="font-medium">Выбран файл:</span>{" "}
                        {fileName}
                      </p>
                      {selectedFile && (
                        <p className="text-gray-400 text-xs">
                          Размер: {(selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                          MB
                        </p>
                      )}
                    </div>
                  )}

                  <p className="text-gray-500 text-xs mt-2">
                    Максимальный размер: 10MB
                  </p>
                </div>

                {/* Разделитель */}
                {!selectedFile && (
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-800"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className=" px-4 text-gray-300 text-sm">
                        Или используйте ссылку
                      </span>
                    </div>
                  </div>
                )}

                {/* Поле для URL (если не выбран файл) */}
                {!selectedFile && (
                  <div>
                    <label
                      className="block text-white font-medium mb-2 text-sm"
                      htmlFor="urlInput"
                    >
                      Ссылка на изображение
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">🔗</span>
                      </div>
                      <input
                        type="text"
                        className="bg-gray-800 border-2 border-gray-700 
               text-white placeholder-gray-400 rounded-xl py-3 pl-10 pr-4
               focus:outline-none focus:border-blue-500 
               hover:border-gray-600
               transition-all duration-200 w-full"
                        id="urlInput"
                        placeholder="https://example.com/photo.jpg"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Поле для названия */}
                <div>
                  <label
                    className="block text-white font-medium mb-2 text-sm"
                    htmlFor="titleInput"
                  >
                    Название фотографии
                  </label>
                  <input
                    type="text"
                    className="bg-gray-800 border-2 border-gray-700 
             text-white placeholder-gray-400 rounded-xl py-3 px-4
             focus:outline-none focus:border-blue-500
             hover:border-gray-600
             transition-all duration-200 w-full"
                    id="titleInput"
                    placeholder="Введите название фотографии"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Футер */}
            <div className="modal-footer bg-white border-t border-gray-800 px-6 py-4">
              <div className="flex justify-between items-center w-full">
                <div className="text-gray-400 text-sm">
                  {title && (url || selectedFile) ? (
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Все поля заполнены
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                      Заполните обязательные поля
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className="px-5 py-2.5 border border-gray-700 text-gray-300 rounded-xl 
                             hover:bg-gray-800 hover:border-gray-600 hover:text-white 
                             transition-all duration-200 font-medium min-w-[100px]"
                    data-bs-dismiss="modal"
                  >
                    Отмена
                  </button>
                  <button
                    data-bs-dismiss="modal"
                    type="button"
                    className={`px-5 py-2.5 rounded-xl font-medium min-w-[120px] transition-all duration-200
                      ${
                        title && (url || selectedFile)
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/20"
                          : "bg-gray-800 text-gray-400 cursor-not-allowed border border-gray-700"
                      }`}
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                    disabled={!title || (!url && !selectedFile)}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span></span>
                      Готово!
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
