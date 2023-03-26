package com.cgi.library.service;

import com.cgi.library.entity.Book;
import com.cgi.library.model.BookDTO;
import com.cgi.library.entity.CheckOut;
import com.cgi.library.repository.BookRepository;
import com.cgi.library.util.ModelMapperFactory;
import com.cgi.library.model.BookStatus;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Page<BookDTO> getBooks(Pageable pageable) {
        ModelMapper modelMapper = ModelMapperFactory.getMapper();
        return bookRepository.findAll(pageable).map(book -> modelMapper.map(book, BookDTO.class));
    }

    public BookDTO getBook(UUID bookId) {
        Book book = bookRepository.getOne(bookId);
        return ModelMapperFactory.getMapper().map(book, BookDTO.class);
    }

    public UUID saveBook(BookDTO bookDTO) {
        ModelMapper modelMapper = ModelMapperFactory.getMapper();
        return bookRepository.save(modelMapper.map(bookDTO, Book.class)).getId();
    }

    public void deleteBook(UUID bookId) {
        bookRepository.deleteById(bookId);
    }


    public void checkoutBook(UUID bookId, String dueDate) {
        Book book = bookRepository.getOne(bookId);
        book.setStatus(BookStatus.BORROWED);
        book.setCheckOutCount(book.getCheckOutCount() + 1);
        System.out.println(dueDate);
        book.setDueDate(LocalDate.parse(dueDate.substring(0, 10)));
        bookRepository.save(book);
    }
}
