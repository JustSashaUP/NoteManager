package com.aionys.notemanager.service.note;

import com.aionys.notemanager.exception.ApiException;
import com.aionys.notemanager.exception.ErrorCode;
import com.aionys.notemanager.mapper.note.NoteMapper;
import com.aionys.notemanager.model.dto.note.NoteRequestDto;
import com.aionys.notemanager.model.dto.note.NoteResponseDto;
import com.aionys.notemanager.model.entity.Note;
import com.aionys.notemanager.repository.note.INoteRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.*;

@Service
public class NoteServiceImpl implements INoteService{

    public final INoteRepository noteRepository;

    public NoteServiceImpl(INoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @Override
    public List<NoteResponseDto> findAll() {
        return noteRepository.findAll()
                .stream()
                .map(NoteMapper::toDto)
                .toList();
    }

    @Override
    public NoteResponseDto findById(long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.NOTE_NOT_FOUND));

        return NoteMapper.toDto(note);
    }

    @Override
    @Transactional
    public NoteResponseDto create(NoteRequestDto noteDto) {
        try {
            Note note = noteRepository.save(NoteMapper.toEntity(noteDto));
            return NoteMapper.toDto(note);
        }
        catch(DataIntegrityViolationException ex) {
            throw new RuntimeException("Database constraint violation while save note.", ex);
        }
    }

    @Override
    @Transactional
    public NoteResponseDto update(Long id, NoteRequestDto  noteDto) {
        try {
            Note existedNote = noteRepository.findById(id)
                    .orElseThrow(() -> new ApiException(ErrorCode.NOTE_NOT_FOUND));

            existedNote.setTitle(noteDto.title());
            existedNote.setContent(noteDto.content());

            return NoteMapper.toDto(existedNote);
        }
        catch(DataIntegrityViolationException ex) {
            throw new RuntimeException("Database constraint violation while update note.", ex);
        }
    }

    @Override
    @Transactional
    public void delete(Long id) {
        try {
            noteRepository.deleteById(id);
        }
        catch(EmptyResultDataAccessException ex) {
            throw new ApiException(ErrorCode.NOTE_NOT_FOUND);
        }
        catch(DataIntegrityViolationException ex) {
            throw new RuntimeException("Database constraint violation while delete note.", ex);
        }
    }
}
