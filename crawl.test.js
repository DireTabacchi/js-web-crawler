import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test('normalizeURL protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative to absolute path', () => {
    const input_html = '<a href="/xyz.html">This is a test</a>'
    const input_base = 'https://www.example.com'
    const expected = ['https://www.example.com/xyz.html']
    const actual = getURLsFromHTML(input_html, input_base)
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML many links', () => {
    const input_html = `<a href="/xyz.html">This is a test</a>\n<a href="https://www.google.com">
    google.com</a>`
    const input_base = 'https://www.example.com'
    const expected = ['https://www.example.com/xyz.html', 'https://www.google.com/']
    const actual = getURLsFromHTML(input_html, input_base)
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML many links', () => {
    const input_html = `<a href="/xyz.html">This is a test</a>\n<a href="https://www.google.com">
    google.com</a><a>no href test</a>`
    const input_base = 'https://www.example.com'
    const expected = ['https://www.example.com/xyz.html', 'https://www.google.com/']
    const actual = getURLsFromHTML(input_html, input_base)
    expect(actual).toEqual(expected)
})
