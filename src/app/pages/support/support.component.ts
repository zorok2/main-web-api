import { Component, OnInit } from '@angular/core';



// import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// import { AuthService } from '../../auth/auth.service';

// import 'style-loader!./support.scss';
// import 'style-loader!./faq.js';
// import 'style-loader!./jquery.highlight-4.js';
// declare var with:any;

// @Component({
//   selector: 'support',
//   templateUrl: './support.html',
// })
// export class Support implements OnInit {
//   private thisYear: number = (new Date()).getFullYear();
//   ngOnInit(): void {
//
//     // event đổi màu navbar khi scroll page
//     var scroll_pos = 0;
//     $(document).scroll(function () {
//       scroll_pos = $(this).scrollTop();
//       if (scroll_pos > 75) { // khi trượt thanh scrollbar
//         // $("#nav-top-support").removeClass().addClass('ninty');
//         $("#nav-top-support").addClass('b-scroll'); // add style background cho navbar
//         $("#btn-login").addClass('color-scroll'); // add style cho link
//       } else {
//         // $("#nav-top-support").removeClass('ninty').addClass('fifty');
//         $("#nav-top-support").removeClass('b-scroll');
//         $("#btn-login").removeClass('color-scroll');
//       }
//     });
//
//     // event open content question
//     $(".faq .faq-item .faq-title").click(function () {
//       var item = $(this).parent('.faq-item');
//       if (item.hasClass("active"))
//         $(this).find(".fa").removeClass("fa-angle-up").addClass("fa-angle-down");
//       else
//         $(this).find(".fa").removeClass("fa-angle-down").addClass("fa-angle-up");
//       item.toggleClass("active");
//     });
//
//     // event search with keyword pho bien
//     $(".listkey .keyword").click(function (this) {
//       $('#faqSearchKeyword').val($(this).data('search'));
//       $("#faqForm").submit();
//     });
//
//     // event search question with keyword (minimum length = 3)
//     $("#faqForm").on("submit", function () {
//       var keyword = $("#faqSearchKeyword").val();
//
//       if (keyword['length'] >= 3) {
//
//         // nếu thỏa validate thì set các control về mặc định
//         $(".faq .faq-item").removeClass("active");
//         $("div.faq-title").find("span.fa").removeClass("fa-angle-up").addClass("fa-angle-down");
//         $("#faqRemoveHighlights").click();
//         $("#faqSearchResult").html("");
//         // $(".faq").removeHighlight();
//
//         var items = $(".faq .faq-text:contains('" + keyword + "')");
//
//         items['highlight'](keyword);
//
//         items.each(function () {
//           $(this).parent(".faq-item").addClass("active");
//           $(this).parent(".faq-item").find("span.fa").removeClass("fa-angle-down").addClass("fa-angle-up");
//         });
//         $("#faqSearchResult").html("<span>Tìm thấy " + items.length + " kết quả trùng khớp.</span>");
//       } else {
//         $("#faqSearchResult").html("<span class='text-danger'>Từ khóa tìm kiếm ít nhất 3 ký tự!</span>");
//
//         $(".faq .faq-item .faq-text span").removeClass("faq-highlight");
//         $(".faq .faq-item").removeClass("active");
//         $("div.faq-title").find("span.fa").removeClass("fa-angle-up").addClass("fa-angle-down");
//       }
//
//       return false;
//     });
//
//     // event open content all question
//     $("#faqOpenAll").click(function () {
//       // alert('open all');
//       $(".faq .faq-item").addClass("active");
//       $("div.faq-title").find(".fa").removeClass("fa-angle-down").addClass("fa-angle-up");
//       // onResize(300);
//     });
//
//     // close content all question
//     $("#faqCloseAll").click(function () {
//       // alert('close all');
//       $(".faq .faq-item").removeClass("active");
//       $("div.faq-title").find(".fa").removeClass("fa-angle-up").addClass("fa-angle-down");
//       // onResize(300);
//     });
//
//     // remove highlight result from event search question with keyword
//     $("#faqRemoveHighlights").click(function () {
//       var hl = $(".faq").find(".faq-highlight");
//       hl.each(function () {
//         var txt = $(this).html();
//         $(this).after(txt);
//         $(this).remove();
//       });
//     });
//     // });
//
//     // // Called when the window resizes
//     // function onResize(cm) {
//     //   // Might be a text scaling operation, clear size caches.
//     //   var d = cm.display;
//     //   d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
//     //   cm.setSize();
//     // }
//
//     jQuery.fn['highlight'] = function (pat) {
//       function innerHighlight(node, pat) {
//         // alert('begin highlight');
//         var skip = 0;
//         if (node.nodeType == 3) {
//           var pos = node.data.toUpperCase().indexOf(pat);
//           if (pos >= 0) {
//             var spannode = document.createElement('span');
//             spannode.className = 'faq-highlight';
//             var middlebit = node.splitText(pos);
//             var endbit = middlebit.splitText(pat.length);
//             var middleclone = middlebit.cloneNode(true);
//             spannode.appendChild(middleclone);
//             middlebit.parentNode.replaceChild(spannode, middlebit);
//             skip = 1;
//           }
//         } else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
//           for (var i = 0; i < node.childNodes.length; ++i) {
//             i += innerHighlight(node.childNodes[i], pat);
//           }
//         }
//         return skip;
//       }
//       return this.length && pat && pat.length ? this.each(function () {
//         innerHighlight(this, pat.toUpperCase());
//       }) : this;
//     };
//   }
//
// }
