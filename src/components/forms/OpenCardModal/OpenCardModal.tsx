'use client';
import { CardData } from "@/shared/types"; 
import { useState, useEffect, useRef } from "react";

interface OpenCardModalProps {
  card: CardData;
  onClose: () => void;
  onAddComment: (commentText: string) => void;
  onDeleteComment?: (cardId: string, commentId: string) => void;
}

export default function OpenCardModal({ 
  card, 
  onClose, 
  onAddComment,
  onDeleteComment 
}: OpenCardModalProps) {
  const [commentText, setCommentText] = useState("");
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText.trim());
      setCommentText("");
    }
  };

  const handleDeleteComment = (commentId: string) => {
    if (onDeleteComment) {
      onDeleteComment(card.id, commentId);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Автопрокрутка к новым комментариям
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [card.comments]);

  // Закрытие по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("ru-RU", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div 
      className="modal show d-block" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={handleBackdropClick}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{card.title}</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          
          <div className="modal-body">
            {/* Изображение карточки */}
            <div className="text-center mb-4">
              <img 
                src={card.url} 
                alt={card.title}
                className="img-fluid rounded"
                style={{ maxHeight: "300px" }}
              />
            </div>

            {/* Секция комментариев */}
            <div className="mb-4">
              <h6>Комментарии ({card.comments?.length || 0})</h6>
              
              {/* Список комментариев */}
              <div 
                className="border rounded p-3 mb-3"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {!card.comments || card.comments.length === 0 ? (
                  <p className="text-muted text-center">Пока нет комментариев</p>
                ) : (
                  card.comments.map((comment) => (
                    <div key={comment.id} className="mb-3 pb-3 border-bottom">
                      <div className="d-flex justify-content-between align-items-start">
                        <p className="mb-1 flex-grow-1">{comment.text}</p>
                        <div className="d-flex align-items-center gap-2">
                          <small className="text-muted">
                            {formatDate(comment.createdAt)}
                          </small>
                          {onDeleteComment && (
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={commentsEndRef} />
              </div>

              {/* Форма добавления комментария */}
              <form onSubmit={handleSubmit}>
                <div className="flex gap-3 input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Напишите комментарий..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    maxLength={500}
                  />
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={!commentText.trim()}
                  >
                    Отправить
                  </button>
                </div>
                <div className="form-text">
                  {commentText.length}/500 символов
                </div>
              </form>
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}