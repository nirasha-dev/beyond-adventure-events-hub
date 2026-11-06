import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Backpack,
  Plus,
  Trash2,
  Edit2,
  Printer,
  RotateCcw,
  Check,
  AlertCircle,
  HardDrive,
  Calendar,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { ADVENTURES_DATA } from '../data/adventures';
import { ChecklistCategory, ChecklistItem } from '../types';
import { useAdventureKit } from '../hooks/useAdventureKit';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import './MyKitPage.css';

const CHECKLIST_CATEGORIES: ChecklistCategory[] = [
  'Clothing',
  'Food and water',
  'Equipment',
  'Personal essentials',
];

export const MyKitPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const eventParam = searchParams.get('event');

  // Find initial adventure id from query parameter if present
  const initialAdv = ADVENTURES_DATA.find(
    (adv) => adv.id === eventParam || adv.slug === eventParam
  );

  const {
    activeAdventureId,
    setActiveAdventureId,
    currentChecklist,
    currentProgress,
    toggleItem,
    addCustomItem,
    renameCustomItem,
    removeCustomItem,
    resetPackedStatus,
  } = useAdventureKit(initialAdv?.id);

  // If search param changes, update active adventure
  useEffect(() => {
    if (initialAdv && initialAdv.id !== activeAdventureId) {
      setActiveAdventureId(initialAdv.id);
    }
  }, [initialAdv, activeAdventureId, setActiveAdventureId]);

  // View Filter: 'all' | 'unpacked'
  const [viewFilter, setViewFilter] = useState<'all' | 'unpacked'>('all');

  // Custom Item Form State
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ChecklistCategory>('Equipment');
  const [addError, setAddError] = useState<string | null>(null);

  // Inline Rename State
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingItemName, setEditingItemName] = useState('');
  const [renameError, setRenameError] = useState<string | null>(null);

  // Reset Confirmation Dialog State
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Active adventure metadata
  const selectedAdventure =
    ADVENTURES_DATA.find((adv) => adv.id === activeAdventureId) || ADVENTURES_DATA[0];

  // Handle adding custom item
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);

    const result = addCustomItem(activeAdventureId, newItemCategory, newItemName);
    if (result.success) {
      setNewItemName('');
    } else {
      setAddError(result.error || 'Failed to add item.');
    }
  };

  // Start editing custom item
  const handleStartRename = (item: ChecklistItem) => {
    setEditingItemId(item.id);
    setEditingItemName(item.name);
    setRenameError(null);
  };

  // Save renamed custom item
  const handleSaveRename = (itemId: string) => {
    const result = renameCustomItem(activeAdventureId, itemId, editingItemName);
    if (result.success) {
      setEditingItemId(null);
      setEditingItemName('');
      setRenameError(null);
    } else {
      setRenameError(result.error || 'Failed to rename item.');
    }
  };

  const handleCancelRename = () => {
    setEditingItemId(null);
    setEditingItemName('');
    setRenameError(null);
  };

  // Trigger browser print
  const handlePrint = () => {
    window.print();
  };

  // Filter items based on active viewFilter ('all' | 'unpacked')
  const visibleItems = currentChecklist.filter((item) => {
    if (viewFilter === 'unpacked') {
      return !item.isPacked;
    }
    return true;
  });

  return (
    <div className="my-kit-page">
      {/* Printable Document Header (visible strictly in print mode) */}
      <div className="print-only print-header-block" aria-hidden="true">
        <h1 className="print-doc-title">BEYOND Adventure Gear Checklist</h1>
        <p className="print-doc-meta">
          <strong>Expedition:</strong> {selectedAdventure.title} ({selectedAdventure.location})
          <br />
          <strong>Dates (Illustrative):</strong> {selectedAdventure.displayDates}
          <br />
          <strong>Generated on:</strong> {new Date().toLocaleDateString()} • Saved on browser session
        </p>
      </div>

      {/* Screen Header Section */}
      <section className="kit-header-section no-print">
        <div className="container">
          <div className="kit-header-eyebrow">
            <Backpack size={16} aria-hidden="true" />
            <span>Interactive Preparation Tool</span>
          </div>
          <h1 className="kit-page-title">My Adventure Kit</h1>
          <p className="kit-page-lead lead">
            Personalize your gear inventory for each expedition. Check off items as you pack, add unique personal essentials, and print a physical copy before hitting the trail.
          </p>

          <div className="kit-storage-pill">
            <HardDrive size={14} aria-hidden="true" />
            <span>Saved on this browser and device via LocalStorage • Preserved across visits</span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container kit-layout-container">
        {/* Event Selector Strip */}
        <section className="event-selector-card no-print" aria-label="Select expedition to pack for">
          <div className="selector-label-group">
            <span className="selector-label">Currently Packing For:</span>
            <select
              id="event-select-dropdown"
              className="event-dropdown"
              value={activeAdventureId}
              onChange={(e) => setActiveAdventureId(e.target.value)}
              aria-label="Select an adventure to view its packing checklist"
            >
              {ADVENTURES_DATA.map((adv) => (
                <option key={adv.id} value={adv.id}>
                  {adv.title} — {adv.category} ({adv.duration})
                </option>
              ))}
            </select>
          </div>

          <div className="selected-event-quick-info">
            <div className="quick-info-item">
              <MapPin size={14} aria-hidden="true" />
              <span>{selectedAdventure.location}</span>
            </div>
            <div className="quick-info-item">
              <Calendar size={14} aria-hidden="true" />
              <span>{selectedAdventure.displayDates}</span>
            </div>
            <Link
              to={`/adventures/${selectedAdventure.slug}`}
              className="view-expedition-link"
              title="View full event details"
            >
              <span>View event details</span>
              <ExternalLink size={12} aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Progress Card */}
        <section className="no-print" aria-label="Packing readiness summary">
          <ProgressIndicator
            progress={currentProgress}
            eventName={selectedAdventure.title}
          />
        </section>

        {/* Checklist Toolbar: Filter, Reset, Print */}
        <div className="checklist-toolbar no-print">
          <div className="filter-segmented-control" role="group" aria-label="Checklist filter">
            <button
              type="button"
              className={`segment-btn ${viewFilter === 'all' ? 'active' : ''}`}
              onClick={() => setViewFilter('all')}
              aria-pressed={viewFilter === 'all'}
            >
              All items ({currentChecklist.length})
            </button>
            <button
              type="button"
              className={`segment-btn ${viewFilter === 'unpacked' ? 'active' : ''}`}
              onClick={() => setViewFilter('unpacked')}
              aria-pressed={viewFilter === 'unpacked'}
            >
              Unpacked only ({currentChecklist.filter((i) => !i.isPacked).length})
            </button>
          </div>

          <div className="toolbar-actions">
            <button
              type="button"
              className="btn btn-ghost btn-sm toolbar-btn"
              onClick={() => setIsResetConfirmOpen(true)}
              disabled={currentChecklist.every((i) => !i.isPacked)}
              aria-label="Reset all packed checkboxes for this adventure"
              title="Uncheck all items"
            >
              <RotateCcw size={14} aria-hidden="true" />
              <span>Reset packed</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm toolbar-btn"
              onClick={handlePrint}
              aria-label="Print packing checklist"
            >
              <Printer size={14} aria-hidden="true" />
              <span>Print checklist</span>
            </button>
          </div>
        </div>

        {/* Category Grouped Checklist */}
        <main className="checklist-groups-wrapper" aria-label="Packing checklist categories">
          {CHECKLIST_CATEGORIES.map((category) => {
            const categoryItems = visibleItems.filter((item) => item.category === category);
            if (categoryItems.length === 0 && viewFilter === 'unpacked') {
              return null; // hide empty categories in unpacked-only filter
            }

            const totalInCategory = currentChecklist.filter((i) => i.category === category).length;
            const packedInCategory = currentChecklist.filter(
              (i) => i.category === category && i.isPacked
            ).length;

            return (
              <section
                key={category}
                className="checklist-category-card"
                aria-labelledby={`cat-title-${category}`}
              >
                <div className="category-card-header">
                  <h3 id={`cat-title-${category}`} className="category-title">
                    {category}
                  </h3>
                  <span className="category-count-badge no-print">
                    {packedInCategory} / {totalInCategory} packed
                  </span>
                </div>

                {categoryItems.length > 0 ? (
                  <ul className="items-list" role="list">
                    {categoryItems.map((item) => {
                      const isEditing = editingItemId === item.id;

                      return (
                        <li
                          key={item.id}
                          className={`checklist-item-row ${item.isPacked ? 'packed' : ''}`}
                        >
                          {/* Checkbox & Text */}
                          <div className="item-main-area">
                            <label className="checkbox-container">
                              <input
                                type="checkbox"
                                checked={item.isPacked}
                                onChange={() => toggleItem(activeAdventureId, item.id)}
                                className="item-checkbox"
                                aria-label={`Mark ${item.name} as ${
                                  item.isPacked ? 'unpacked' : 'packed'
                                }`}
                              />
                              <span className="custom-checkmark" aria-hidden="true">
                                {item.isPacked && <Check size={14} />}
                              </span>
                            </label>

                            {isEditing ? (
                              <div className="inline-edit-form">
                                <input
                                  type="text"
                                  value={editingItemName}
                                  onChange={(e) => setEditingItemName(e.target.value)}
                                  className="inline-edit-input"
                                  maxLength={60}
                                  autoFocus
                                  aria-label="Edit item name"
                                />
                                {renameError && (
                                  <span className="inline-edit-error" role="alert">
                                    {renameError}
                                  </span>
                                )}
                                <div className="inline-edit-btns">
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleSaveRename(item.id)}
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-ghost btn-sm"
                                    onClick={handleCancelRename}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="item-text-block">
                                <span className="item-name">{item.name}</span>
                                {item.note && <span className="item-note">{item.note}</span>}
                                {item.isCustom && (
                                  <span className="custom-tag no-print">Custom item</span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Custom Item Controls: Rename, Delete (no-print) */}
                          {item.isCustom && !isEditing && (
                            <div className="item-actions no-print">
                              <button
                                type="button"
                                className="item-action-btn"
                                onClick={() => handleStartRename(item)}
                                aria-label={`Rename custom item "${item.name}"`}
                                title="Rename item"
                              >
                                <Edit2 size={14} aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                className="item-action-btn delete-btn"
                                onClick={() => removeCustomItem(activeAdventureId, item.id)}
                                aria-label={`Remove custom item "${item.name}"`}
                                title="Delete item"
                              >
                                <Trash2 size={14} aria-hidden="true" />
                              </button>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="category-empty-text no-print">
                    All items in this category are packed!
                  </p>
                )}
              </section>
            );
          })}
        </main>

        {/* Add Custom Item Form */}
        <section className="add-item-card no-print" aria-labelledby="add-item-heading">
          <h3 id="add-item-heading" className="add-item-title">
            <Plus size={18} aria-hidden="true" />
            <span>Add Personal Custom Item</span>
          </h3>
          <p className="add-item-lead">
            Need special prescription drops, an external camera mount, or favorite energy chews? Add it here to track in your personal kit.
          </p>

          <form onSubmit={handleAddItem} className="add-item-form" noValidate>
            <div className="add-form-row">
              <div className="add-input-group flex-1">
                <label htmlFor="custom-item-name" className="sr-only">
                  Item name
                </label>
                <input
                  id="custom-item-name"
                  type="text"
                  placeholder="e.g. GoPro chest harness or energy bars"
                  value={newItemName}
                  onChange={(e) => {
                    setNewItemName(e.target.value);
                    if (addError) setAddError(null);
                  }}
                  className={`form-input ${addError ? 'has-error' : ''}`}
                  maxLength={60}
                />
              </div>

              <div className="add-select-group">
                <label htmlFor="custom-item-category" className="sr-only">
                  Category
                </label>
                <select
                  id="custom-item-category"
                  value={newItemCategory}
                  onChange={(e) =>
                    setNewItemCategory(e.target.value as ChecklistCategory)
                  }
                  className="form-select"
                >
                  {CHECKLIST_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary add-submit-btn">
                <Plus size={16} aria-hidden="true" />
                <span>Add item</span>
              </button>
            </div>

            {addError && (
              <p className="field-error-message" role="alert">
                <AlertCircle size={14} aria-hidden="true" />
                <span>{addError}</span>
              </p>
            )}
          </form>
        </section>
      </div>

      {/* Confirmation Dialog for Resetting Checkmarks */}
      <ConfirmationDialog
        isOpen={isResetConfirmOpen}
        title="Reset Packed Checkmarks?"
        message={`Are you sure you want to reset all packed checkmarks for "${selectedAdventure.title}"? Your custom items will be preserved, but all items will be marked as unpacked.`}
        confirmLabel="Yes, Reset Checkmarks"
        cancelLabel="Keep Packed"
        onConfirm={() => {
          resetPackedStatus(activeAdventureId);
          setIsResetConfirmOpen(false);
        }}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
};

