'use client';
import { CardData } from "@/shared/types"; 
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/toast/ToastProvider";

interface OpenCardModalProps {
  card: CardData;
  onClose: () => void;
  onAddComment: (commentText: string) => Promise<void>;
  onDeleteComment?: (cardId: string, commentId: string) => Promise<void>;
}

export default function OpenCardModal({ 
  card, 
  onClose, 
  onAddComment,
  onDeleteComment 
}: OpenCardModalProps) {
  const { showToast } = useToast();
  const [commentText, setCommentText] = useState("");
  const [modalImageSrc, setModalImageSrc] = useState(card.url);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      try {
        await onAddComment(commentText.trim());
        setCommentText("");
      } catch (error: any) {
        showToast(error?.message || "Чтобы добавить комментарий, войдите в профиль", "error");
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (onDeleteComment) {
      try {
        await onDeleteComment(card.id, commentId);
      } catch (error: any) {
        showToast(error?.message || "Чтобы удалить комментарий, войдите в профиль", "error");
      }
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
                src={modalImageSrc} 
                alt={card.title}
                className="img-fluid rounded"
                style={{ maxHeight: "300px" }}
                onError={() => {
                  if (modalImageSrc !== "/avatar.jpg") setModalImageSrc("/avatar.jpg");
                }}
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
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <img
                              src={comment.ownerAvatarUrl || "/avatar.jpg"}
                              alt={comment.ownerName || "Автор"}
                              className="rounded-full"
                              style={{ width: "24px", height: "24px", objectFit: "cover" }}
                            />
                            <strong style={{ fontSize: "0.9rem" }}>{comment.ownerName || "Пользователь"}</strong>
                          </div>
                          <p className="mb-1">{comment.text}</p>
                        </div>
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